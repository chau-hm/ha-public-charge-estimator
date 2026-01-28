/**
 * Calculation engine for Hong Kong Hospital Authority Public Charge Estimator
 * All calculations must match golden_cases.json expected outputs
 */

import { FEES, ASC, ADVISORY_BANDS, MEDICATION_UNITS_BY_TIER } from "./config";
import type {
  SpecialtyInput,
  MonthlyBreakdown,
  CalculationResult,
  CalculationSummary,
  AscAdvisory,
  AscAdvisoryLevel,
  VisitSchedule,
  MedicationUnits,
  MedicationTier,
  ServiceType,
  MonthNumber
} from "./types";

/**
 * Generate visit schedule for a specialty across 12 months
 * @param nextMonth - Next followup month (1-12)
 * @param frequencyMonths - Followup frequency in months (1, 2, 3, 4, or 6)
 * @returns Boolean array of 12 elements (true = visit occurs in that month)
 */
export function generateVisitScheduleMonths(
  nextMonth: MonthNumber,
  frequencyMonths: number
): VisitSchedule {
  const schedule: boolean[] = Array(12).fill(false);

  // Starting from nextMonth (inclusive), schedule visits every frequencyMonths
  for (let month = nextMonth; month <= 12; month += frequencyMonths) {
    schedule[month - 1] = true; // Convert to 0-indexed
  }

  return schedule;
}

/**
 * Get medication units for each month based on tier
 * @param tier - Medication tier (none, low, medium, high)
 * @returns Array of 12 numbers representing medication units per month
 */
export function getMedicationUnitsByTier(tier: MedicationTier): MedicationUnits {
  return [...MEDICATION_UNITS_BY_TIER[tier]];
}

/**
 * Get fee amounts based on service type
 * @param serviceType - Service type (sopc or gopc)
 * @returns Object with visit and medication unit fees
 */
function getFeesByServiceType(serviceType: ServiceType): {
  visitFee: number;
  medUnitFee: number;
} {
  if (serviceType === "sopc") {
    return {
      visitFee: FEES.SOPC.VISIT,
      medUnitFee: FEES.SOPC.MEDICATION_UNIT
    };
  } else {
    return {
      visitFee: FEES.GOPC.VISIT,
      medUnitFee: FEES.GOPC.MEDICATION_UNIT
    };
  }
}

/**
 * Calculate monthly totals and breakdown for given specialty inputs
 * @param inputs - Array of specialty inputs
 * @returns Object with monthly totals and breakdown
 */
export function calculateMonthlyTotals(inputs: SpecialtyInput[]): {
  monthlyTotals: number[];
  breakdown: MonthlyBreakdown;
} {
  // Initialize arrays for 12 months
  const visitBreakdown = Array(12).fill(0);
  const medicationBreakdown = Array(12).fill(0);

  // Process each specialty
  for (const specialty of inputs) {
    const { visitFee, medUnitFee } = getFeesByServiceType(specialty.service_type);

    // Generate visit schedule
    const visitSchedule = generateVisitScheduleMonths(
      specialty.next_followup_month,
      specialty.followup_frequency_months
    );

    // Get medication units
    const medicationUnits = getMedicationUnitsByTier(specialty.medication_tier);

    // Calculate fees for each month
    for (let month = 0; month < 12; month++) {
      // Add visit fee if scheduled
      if (visitSchedule[month]) {
        visitBreakdown[month] += visitFee;
      }

      // Add medication fee
      const medFee = medicationUnits[month] * medUnitFee;
      medicationBreakdown[month] += medFee;
    }
  }

  // Calculate monthly totals after processing all specialties
  const monthlyTotals = visitBreakdown.map((visits, month) => visits + medicationBreakdown[month]);

  return {
    monthlyTotals,
    breakdown: {
      visits: visitBreakdown,
      medications: medicationBreakdown
    }
  };
}

/**
 * Summarize monthly totals into annual metrics
 * @param monthlyTotals - Array of 12 monthly totals
 * @returns Summary with annual total, monthly average, and peak months
 */
export function summarize(monthlyTotals: number[]): CalculationSummary {
  // Calculate annual total
  const annualTotal = monthlyTotals.reduce((sum, total) => sum + total, 0);

  // Calculate monthly average (rounded to 2 decimals)
  const monthlyAverage = Math.round((annualTotal / 12) * 100) / 100;

  // Find peak months
  const peakTotal = Math.max(...monthlyTotals);
  const peakMonths: MonthNumber[] = [];

  for (let i = 0; i < 12; i++) {
    if (monthlyTotals[i] === peakTotal) {
      peakMonths.push((i + 1) as MonthNumber);
    }
  }

  return {
    annual_total: annualTotal,
    monthly_average: monthlyAverage,
    peak_months: peakMonths,
    peak_total: peakTotal
  };
}

/**
 * Get ASC advisory level based on annual total
 * @param annualTotal - Annual total cost
 * @param ascAmount - ASC cap amount (default: 10000)
 * @returns ASC advisory information
 */
export function getAscAdvisory(annualTotal: number, ascAmount: number = ASC.AMOUNT): AscAdvisory {
  const ratio = annualTotal / ascAmount;

  let level: AscAdvisoryLevel = "none";

  if (ratio >= ADVISORY_BANDS.STRONG_ADVISORY.MIN) {
    level = "strong_advisory";
  } else if (ratio >= ADVISORY_BANDS.ADVISORY.MIN) {
    level = "advisory";
  } else if (ratio >= ADVISORY_BANDS.NOTICE.MIN) {
    level = "notice";
  }

  return {
    level,
    ratio,
    should_display: ratio >= ADVISORY_BANDS.NOTICE.MIN
  };
}

/**
 * Main calculation function - calculate complete results for given inputs
 * @param inputs - Array of specialty inputs
 * @returns Complete calculation result with monthly totals, breakdown, summary, and ASC advisory
 */
export function calculate(inputs: SpecialtyInput[]): CalculationResult {
  // If no inputs, return zero results
  if (inputs.length === 0) {
    const zeroMonthlyTotals = Array(12).fill(0);
    return {
      monthly_totals: zeroMonthlyTotals,
      breakdown: {
        visits: Array(12).fill(0),
        medications: Array(12).fill(0)
      },
      summary: {
        annual_total: 0,
        monthly_average: 0,
        peak_months: [],
        peak_total: 0
      },
      asc_advisory: "none"
    };
  }

  // Calculate monthly totals and breakdown
  const { monthlyTotals, breakdown } = calculateMonthlyTotals(inputs);

  // Generate summary
  const summary = summarize(monthlyTotals);

  // Get ASC advisory
  const ascAdvisory = getAscAdvisory(summary.annual_total);

  return {
    monthly_totals: monthlyTotals,
    breakdown,
    summary,
    asc_advisory: ascAdvisory.level
  };
}
