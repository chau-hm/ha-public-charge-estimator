/**
 * Golden case validation for development
 * Loads golden_cases.json and validates calculation results
 */

import goldenCases from "../../spec/golden_cases.json";
import { calculate } from "../calc";
import type { SpecialtyInput } from "../types";

interface GoldenCase {
  case_id: string;
  description: string;
  inputs: {
    specialties: SpecialtyInput[];
  };
  expected: {
    monthly_totals: number[];
    breakdown: {
      visits: number[];
      medications: number[];
    };
    annual_total: number;
    monthly_average: number;
    peak_months: number[];
    peak_total: number;
  };
}

interface ValidationResult {
  case_id: string;
  passed: boolean;
  errors: string[];
}

/**
 * Compare two arrays for equality
 */
function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

/**
 * Validate a single golden case
 */
function validateCase(testCase: GoldenCase): ValidationResult {
  const errors: string[] = [];
  const result = calculate(testCase.inputs.specialties);

  // Check monthly totals
  if (!arraysEqual(result.monthly_totals, testCase.expected.monthly_totals)) {
    errors.push(
      `Monthly totals mismatch. Expected: ${JSON.stringify(
        testCase.expected.monthly_totals
      )}, Got: ${JSON.stringify(result.monthly_totals)}`
    );
  }

  // Check breakdown visits
  if (!arraysEqual(result.breakdown.visits, testCase.expected.breakdown.visits)) {
    errors.push(
      `Breakdown visits mismatch. Expected: ${JSON.stringify(
        testCase.expected.breakdown.visits
      )}, Got: ${JSON.stringify(result.breakdown.visits)}`
    );
  }

  // Check breakdown medications
  if (!arraysEqual(result.breakdown.medications, testCase.expected.breakdown.medications)) {
    errors.push(
      `Breakdown medications mismatch. Expected: ${JSON.stringify(
        testCase.expected.breakdown.medications
      )}, Got: ${JSON.stringify(result.breakdown.medications)}`
    );
  }

  // Check annual total
  if (result.summary.annual_total !== testCase.expected.annual_total) {
    errors.push(
      `Annual total mismatch. Expected: ${testCase.expected.annual_total}, Got: ${result.summary.annual_total}`
    );
  }

  // Check monthly average (with tolerance for floating point)
  const avgDiff = Math.abs(result.summary.monthly_average - testCase.expected.monthly_average);
  if (avgDiff > 0.01) {
    errors.push(
      `Monthly average mismatch. Expected: ${testCase.expected.monthly_average}, Got: ${result.summary.monthly_average}`
    );
  }

  // Check peak months
  if (!arraysEqual(result.summary.peak_months, testCase.expected.peak_months)) {
    errors.push(
      `Peak months mismatch. Expected: ${JSON.stringify(
        testCase.expected.peak_months
      )}, Got: ${JSON.stringify(result.summary.peak_months)}`
    );
  }

  // Check peak total
  if (result.summary.peak_total !== testCase.expected.peak_total) {
    errors.push(
      `Peak total mismatch. Expected: ${testCase.expected.peak_total}, Got: ${result.summary.peak_total}`
    );
  }

  return {
    case_id: testCase.case_id,
    passed: errors.length === 0,
    errors
  };
}

/**
 * Run all golden case tests
 */
export function runGoldenTests(): { passed: number; failed: number } {
  console.log("🧪 Running Golden Case Tests...\n");

  const testCases = goldenCases.test_cases as GoldenCase[];
  const results: ValidationResult[] = [];

  for (const testCase of testCases) {
    const result = validateCase(testCase);
    results.push(result);

    if (result.passed) {
      console.log(`✅ ${testCase.case_id}: PASS`);
    } else {
      console.error(`❌ ${testCase.case_id}: FAIL`);
      console.error(`   Description: ${testCase.description}`);
      result.errors.forEach((error) => {
        console.error(`   - ${error}`);
      });
    }
  }

  // Summary
  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  console.log(`\n${"=".repeat(60)}`);
  console.log(
    `📊 Test Results: ${passedCount}/${totalCount} passed (${Math.round(
      (passedCount / totalCount) * 100
    )}%)`
  );
  console.log(`${"=".repeat(60)}\n`);

  if (passedCount === totalCount) {
    console.log("🎉 All tests passed!");
  } else {
    console.error(`⚠️ ${totalCount - passedCount} test(s) failed.`);
  }

  return { passed: passedCount, failed: totalCount - passedCount };
}

/**
 * Quick validation function for console
 */
export function quickValidate(): void {
  try {
    runGoldenTests();
  } catch (error) {
    console.error("Error running golden tests:", error);
  }
}

// Auto-run in development if invoked directly
if (import.meta && (import.meta as any).env && (import.meta as any).env.MODE) {
  // Running in Vite context - do nothing
} else {
  runGoldenTests();
}
