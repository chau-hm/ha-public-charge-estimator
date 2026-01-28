/**
 * TypeScript type definitions for the HA Public Charge Estimator
 */

// Service types
export type ServiceType = "sopc" | "gopc";

// Medication tiers
export type MedicationTier = "none" | "low" | "medium" | "high";

// Followup frequencies (in months)
export type FollowupFrequency = 1 | 2 | 3 | 4 | 6;

// Month number (1-12)
export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Input for a single specialty row
 */
export interface SpecialtyInput {
  id?: string; // Optional unique identifier for React keys
  specialty_label: string;
  service_type: ServiceType;
  followup_frequency_months: FollowupFrequency;
  next_followup_month: MonthNumber;
  medication_tier: MedicationTier;
}

/**
 * Monthly breakdown of visits and medication costs
 */
export interface MonthlyBreakdown {
  visits: number[]; // 12 elements, one per month
  medications: number[]; // 12 elements, one per month
}

/**
 * Peak month information
 */
export interface PeakMonthInfo {
  months: MonthNumber[]; // Can be multiple months with same peak total
  total: number;
}

/**
 * Summary of annual calculations
 */
export interface CalculationSummary {
  annual_total: number;
  monthly_average: number; // Rounded to 2 decimal places
  peak_months: MonthNumber[];
  peak_total: number;
}

/**
 * Complete calculation result
 */
export interface CalculationResult {
  monthly_totals: number[]; // 12 elements, one per month
  breakdown: MonthlyBreakdown;
  summary: CalculationSummary;
  asc_advisory?: AscAdvisoryLevel;
}

/**
 * ASC Advisory levels
 */
export type AscAdvisoryLevel = "none" | "notice" | "advisory" | "strong_advisory";

/**
 * ASC Advisory information
 */
export interface AscAdvisory {
  level: AscAdvisoryLevel;
  ratio: number; // annual_total / ASC_AMOUNT
  should_display: boolean;
}

/**
 * Visit schedule for a specialty (boolean array for 12 months)
 */
export type VisitSchedule = boolean[]; // 12 elements, true if visit occurs in that month

/**
 * Medication units for 12 months
 */
export type MedicationUnits = number[]; // 12 elements

/**
 * Props for SpecialtyTable component
 */
export interface SpecialtyTableProps {
  specialties: SpecialtyInput[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, specialty: SpecialtyInput) => void;
}

/**
 * Props for ResultsPanel component
 */
export interface ResultsPanelProps {
  result: CalculationResult | null;
}

/**
 * Props for MonthlyGrid component
 */
export interface MonthlyGridProps {
  monthlyTotals: number[];
  breakdown: MonthlyBreakdown;
  peakMonths: MonthNumber[];
}

/**
 * Props for AscPanel component
 */
export interface AscPanelProps {
  ascAdvisory: AscAdvisory;
}
