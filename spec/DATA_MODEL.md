
# Data Model（資料模型定義）

> 目的：固定欄位名與語義，避免生成物出現「同一概念多個欄位名」導致對唔到 spec / golden cases。

---

## 1. SpecialtyInput（每一科／每一行）

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---:|---|
| specialty_label | string | ✅ | 用戶輸入的專科名稱（識別用，唔影響收費常數） |
| service_type | "sopc" \| "gopc" | ✅ | 服務類型：專科門診／普通科門診 |
| followup_frequency_months | 1\|2\|3\|4\|6 | ✅ | 覆診頻率（每幾個月一次） |
| next_followup_month | number (1..12) | ✅ | 下次覆診月份，用作月度分佈 offset |
| long_term_followup | boolean | ✅ | 本期回歸假設 true；若 false 可只計一次（由實作另定） |
| medication_tier | "none"\|"low"\|"medium"\|"high" | ✅ | 藥物數量級（只作補藥節奏估算，不代表藥價） |

---

## 2. CalculationResult（計算輸出）

| 欄位 | 型別 | 說明 |
|---|---|---|
| monthlyTotals | number[12] | 1..12 月合計費用 |
| breakdown.visits | number[12] | 1..12 月診症費 |
| breakdown.meds | number[12] | 1..12 月藥費 |
| annualTotal | number | 年度合計（sum monthlyTotals） |
| monthlyAverage | number | annualTotal / 12，四捨五入至 2 位小數 |
| peakMonths | number[] | 最高月費出現的月份（可多個） |
| peakTotal | number | 最高月費金額 |

---

## 3. ASC Advisory（全年收費上限提示）

| 欄位 | 型別 | 說明 |
|---|---|---|
| asc.amount | number | HK$10,000（系統常數） |
| asc.ratio | number | annualTotal / asc.amount |
| asc.level | "none"\|"notice"\|"advisory"\|"strong_advisory" | 提示級別（不得聲稱資格） |

---

## 4. Determinism（確定性要求）

- medication units pattern 必須完全依 `spec/golden_cases.json` 的 `calculation_contract`：
  - none:  [0,0,0,0,0,0,0,0,0,0,0,0]
  - low:   [1,1,1,1,1,1,1,1,1,1,1,1]
  - medium:[1,1,2,1,1,2,1,1,2,1,1,2]
  - high:  [1,2,1,2,1,3,1,2,1,2,1,3]
