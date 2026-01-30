/**
 * ResultsPanel Component
 * Display calculation results (summary)
 */

import type { ResultsPanelProps } from '../types';
import { UI_LABELS } from '../config';

export function ResultsPanel({ result }: ResultsPanelProps) {
  if (!result) {
    return null;
  }

  const { summary } = result;

  // Format peak months for display
  const peakMonthsText =
    summary.peak_months.length > 0
      ? summary.peak_months.map((m) => `${m}月`).join('、')
      : '-';

  return (
    <div className="results-panel">
      <h2>📊 你的全年費用概覽</h2>

      <div className="results-kpis">
        <div className="kpi-card">
          <div className="kpi-label">{UI_LABELS.RESULTS.MONTHLY_AVERAGE}</div>
          <div className="kpi-value">HK${summary.monthly_average.toFixed(2)}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">{UI_LABELS.RESULTS.ANNUAL_TOTAL}</div>
          <div className="kpi-value">HK${summary.annual_total.toLocaleString()}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">{UI_LABELS.RESULTS.PEAK_MONTHS}</div>
          <div className="kpi-value">
            {peakMonthsText}
            {summary.peak_total > 0 && (
              <div className="kpi-subvalue">HK${summary.peak_total.toLocaleString()}</div>
            )}
          </div>
        </div>
      </div>

      <p className="results-explanation">{UI_LABELS.RESULTS.EXPLANATION}</p>

      <div className="results-disclaimer">
        {UI_LABELS.DISCLAIMERS.RESULTS_FOOTER}
      </div>
    </div>
  );
}
