import { describe, it, expect } from "vitest";
import goldenCases from "../spec/golden_cases.json";
import { calculate } from "../src/calc";
import type { SpecialtyInput } from "../src/types";

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

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

describe("golden cases", () => {
  const testCases = goldenCases.test_cases as GoldenCase[];

  for (const c of testCases) {
    it(c.case_id, () => {
      const result = calculate(c.inputs.specialties);

      expect(result.monthly_totals).toEqual(c.expected.monthly_totals);
      expect(result.breakdown.visits).toEqual(c.expected.breakdown.visits);
      expect(result.breakdown.medications).toEqual(c.expected.breakdown.medications);

      expect(result.summary.annual_total).toBe(c.expected.annual_total);
      expect(round2(result.summary.monthly_average)).toBe(c.expected.monthly_average);
      expect(result.summary.peak_months).toEqual(c.expected.peak_months);
      expect(result.summary.peak_total).toBe(c.expected.peak_total);
    });
  }
});
