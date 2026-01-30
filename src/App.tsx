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
      medication_tier: 'none',
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
          一個幫助你預計全年醫療費用的簡易工具。
        </p>
        <p className="intro-text">
          根據你輸入的覆診月份、覆診頻率及藥物數量級，估算全年費用分佈與可能的高峰月份。
        </p>
        <div className="info-section">
          <h2>這個工具可以幫你什麼？</h2>
          <ul className="features-list">
            <li>💰 <strong>預計全年醫療費用</strong> – 知道今年要花多少錢去睇醫生</li>
            <li>📅 <strong>看清楚費用分佈</strong> – 知道哪幾個月費用會特別高</li>
            <li>🎯 <strong>及早了解保障上限</strong> – 提醒你醫管局有 HK$10,000 全年上限，但需要主動申請</li>
          </ul>
        </div>

        <div className="info-section">
          <h2>誰適合用？</h2>
          <ul className="suitable-list">
            <li>✓ 需要同時睇多個專科的病人</li>
            <li>✓ 長期服藥需要補藥的人</li>
            <li>✓ 想了解今年醫療費用的家人</li>
            <li>✓ 醫務社會服務人員</li>
          </ul>
        </div>


        <div className="disclaimer-box">
          <strong>免責聲明：</strong>
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
