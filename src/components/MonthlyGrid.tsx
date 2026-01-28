/**
 * MonthlyGrid Component
 * Display 12-month distribution of fees
 */

import { useState } from 'react';
import type { MonthlyGridProps } from '../types';
import { UI_LABELS } from '../config';

export function MonthlyGrid({ monthlyTotals, breakdown, peakMonths }: MonthlyGridProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const allMonthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月',
  ];

  // 從當前月份開始排列
  const currentMonth = new Date().getMonth(); // 0-11
  const monthNames = [
    ...allMonthNames.slice(currentMonth),
    ...allMonthNames.slice(0, currentMonth),
  ];
  const monthIndices = [
    ...Array.from({ length: 12 - currentMonth }, (_, i) => currentMonth + i),
    ...Array.from({ length: currentMonth }, (_, i) => i),
  ];

  return (
    <div className="monthly-grid">
      <h2>{UI_LABELS.MONTHLY_DISTRIBUTION.SECTION_TITLE}</h2>

      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="toggle-breakdown"
      >
        {showBreakdown ? '收起拆解' : '顯示拆解'}
      </button>

      {!showBreakdown ? (
        <div className="month-grid">
          {monthNames.map((monthName, displayIndex) => {
            const actualIndex = monthIndices[displayIndex];
            const isPeak = peakMonths.includes((actualIndex + 1) as any);
            return (
              <div
                key={displayIndex}
                className={`month-cell ${isPeak ? 'peak' : ''}`}
              >
                <div className="month-label">{monthName}</div>
                <div className="month-total">
                  HK${monthlyTotals[actualIndex].toLocaleString()}
                </div>
                <div className="month-breakdown-hint">
                  診症 HK${breakdown.visits[actualIndex]} + 藥費 HK${breakdown.medications[actualIndex]}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="breakdown-table">
          <table>
            <thead>
              <tr>
                <th>月份</th>
                <th>{UI_LABELS.MONTHLY_DISTRIBUTION.VISIT_FEES}</th>
                <th>{UI_LABELS.MONTHLY_DISTRIBUTION.MEDICATION_FEES}</th>
                <th>{UI_LABELS.MONTHLY_DISTRIBUTION.TOTAL}</th>
              </tr>
            </thead>
            <tbody>
              {monthNames.map((monthName, displayIndex) => {
                const actualIndex = monthIndices[displayIndex];
                const isPeak = peakMonths.includes((actualIndex + 1) as any);
                return (
                  <tr key={displayIndex} className={isPeak ? 'peak-row' : ''}>
                    <td>{monthName}</td>
                    <td>HK${breakdown.visits[actualIndex].toLocaleString()}</td>
                    <td>HK${breakdown.medications[actualIndex].toLocaleString()}</td>
                    <td className="total-cell">
                      HK${monthlyTotals[actualIndex].toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
