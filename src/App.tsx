import { useState, useEffect } from 'react';
import './app.css';
import {
  SpecialtyTable,
  ResultsPanel,
  MonthlyGrid,
  AscPanel,
  SystemConstants,
} from './components';
import { calculate, getAscAdvisory } from './calc';
import type { SpecialtyInput, CalculationResult } from './types';
import { UI_LABELS } from './config';

export default function App() {
  const [specialties, setSpecialties] = useState<SpecialtyInput[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Recalculate whenever specialties change
  useEffect(() => {
    if (specialties.length === 0) {
      setResult(null);
      return;
    }

    const calculationResult = calculate(specialties);
    setResult(calculationResult);
  }, [specialties]);

  const handleAddSpecialty = () => {
    const newSpecialty: SpecialtyInput = {
      id: `specialty-${Date.now()}`,
      specialty_label: '',
      service_type: 'sopc',
      followup_frequency_months: 3,
      next_followup_month: 1,
      medication_quantity: 0,
    };
    setSpecialties([...specialties, newSpecialty]);
  };

  const handleRemoveSpecialty = (index: number) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  const handleUpdateSpecialty = (index: number, updated: SpecialtyInput) => {
    const newSpecialties = [...specialties];
    newSpecialties[index] = updated;
    setSpecialties(newSpecialties);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{UI_LABELS.PAGE_TITLE}</h1>
        <p className="intro-text">
          根據你輸入的覆診月份、覆診頻率及藥物數目，估算全年醫療費用分佈與高峰月份。
        </p>

        <div className="info-section">
          <h2>核心功能</h2>
          <ul className="features-list">
            <li>💰 <strong>全年費用預算</strong> – 知道今年大概要花幾多錢</li>
            <li>📅 <strong>費用分佈明細</strong> – 查看每月花費，找出高峰月份</li>
            <li>🛡️ <strong>全年保障提示</strong> – 及早提醒 HK$10,000 上限（需主動申請）</li>
          </ul>
        </div>

        <div className="disclaimer-box">
          <strong>重要聲明</strong>
          <p>{UI_LABELS.DISCLAIMERS.MAIN}</p>
          <p>{UI_LABELS.DISCLAIMERS.ASC}</p>
        </div>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <SystemConstants />
        </aside>

        <main className="main-content">
          <section className="input-section">
            <SpecialtyTable
              specialties={specialties}
              onAdd={handleAddSpecialty}
              onRemove={handleRemoveSpecialty}
              onUpdate={handleUpdateSpecialty}
            />
          </section>

          {result && (
            <>
              <section className="results-section">
                <ResultsPanel result={result} />
              </section>

              <section className="monthly-section">
                <MonthlyGrid
                  monthlyTotals={result.monthly_totals}
                  breakdown={result.breakdown}
                  peakMonths={result.summary.peak_months}
                />
              </section>

              {result.asc_advisory && (
                <section className="asc-section">
                  <AscPanel
                    ascAdvisory={getAscAdvisory(result.summary.annual_total)}
                  />
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
