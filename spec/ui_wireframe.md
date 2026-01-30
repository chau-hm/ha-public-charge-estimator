# UI Wireframe（文字版）

> 目標：固定 UI 結構，避免生成成 generic form。
> 原則：用戶只輸入「情境」，不輸入任何 HK$。

---

## Page Layout（Single Page）

### 1) Header

- [H1] 公營醫療費用計算器（香港醫管局制度版）
- [P] 簡介（短）
- [Callout] 免責聲明（Entry/Header 版本）

---

### 2) System Constants (Read-only Info)

（可放在側邊卡片 / accordion）

- 專科門診診症費：HK$250／次
- 專科門診藥費：HK$20／每 4 星期（系統按月估算）
- 普通科門診診症費：HK$150／次
- 普通科門診藥費：HK$5／每 4 星期（系統按月估算）
- ASC：HK$10,000（提示：需申請＋審核，非自動）

---

### 3) Specialty Editor（核心輸入區）

**Section Title:** 你的專科與覆診資料

#### 3.1 Table / List of rows (repeatable)

每行欄位（左到右）：

1. 專科名稱（Text）
2. 服務類型（Select：專科門診 / 普通科門診；預設=專科門診）
3. 覆診頻率（Select：1/2/3/4/6 個月）
4. 下次覆診月份（Select：1–12，必填）
5. 藥物數目（Select：0–10，必填）
6. [Button] 移除

#### 3.2 Row actions

- [Primary Button] 新增專科

#### 3.3 Inline helper

- 小字提示：藥物數目只用於估算每月藥費

---

### 4) Results Panel（結果總覽）

（建議；至少在輸入區下方固定呈現）

**Section Title:** 估算結果

Cards / KPIs:

- 平均每月費用（估算）：HK$xx.xx
- 全年累計費用（估算）：HK$xxxx
- 最高支出月份（估算）：n月（如多個，列出：n月、m月…）＋ HK$xxxx

Below KPIs:

- 一段結果說明文字（見 ui_copy）

Results disclaimer (footer):

- 本工具僅供估算…（見 ui_copy）

---

### 5) Monthly Distribution（12 個月分佈）

**Section Title:** 全年費用分佈（按月份）

Display:

- 12 個月份格（1月至12月）
- 每格顯示：
  - 合計：HK$xxx
  - （可選）小字：診症 HK$xx + 藥費 HK$xx

Optional Expand/Collapse:

- 顯示拆解表格（月份列，診症/藥費/合計欄）

---

### 6) ASC Advisory Panel（條件顯示）

顯示條件：annual_total / 10000 >= 0.5

**Section Title:** 全年收費上限提示

內容：

- 共通說明（固定顯示）
- 提示文字（按 band 顯示：提醒/建議了解/強烈建議）
- CTA buttons（文字按 ui_copy）

---

### 7) Footer

- 可選：資料來源提示（不放 URL 亦可）
- 可選：版本號 / build info（dev-only）
