/**
 * Configuration constants for Hong Kong Hospital Authority fees
 * All values are read-only and sourced from fees_spec.json
 * Users CANNOT modify these values through the UI
 */

// Service type fees
export const FEES = {
  SOPC: {
    VISIT: 250, // HK$ per attendance
    MEDICATION_UNIT: 20 // HK$ per 4 weeks
  },
  GOPC: {
    VISIT: 150, // HK$ per attendance
    MEDICATION_UNIT: 5 // HK$ per 4 weeks
  }
} as const;

// Annual Spending Cap (ASC)
export const ASC = {
  AMOUNT: 10000, // HK$
  CYCLE: {
    START_MONTH: 1,
    START_DAY: 1,
    END_MONTH: 12,
    END_DAY: 31
  }
} as const;

// Advisory bands based on ratio to ASC amount
export const ADVISORY_BANDS = {
  NONE: { MIN: 0.0, MAX: 0.5, UI: "hide" },
  NOTICE: { MIN: 0.5, MAX: 0.8, UI: "show_notice" },
  ADVISORY: { MIN: 0.8, MAX: 1.0, UI: "show_advisory" },
  STRONG_ADVISORY: { MIN: 1.0, MAX: Infinity, UI: "show_strong_advisory" }
} as const;

// Followup frequency options (in months)
export const FOLLOWUP_FREQUENCIES = [1, 2, 3, 4, 6] as const;

// Service types
export const SERVICE_TYPES = {
  SOPC: "sopc",
  GOPC: "gopc"
} as const;

// UI Labels (Traditional Chinese - Hong Kong)
export const UI_LABELS = {
  PAGE_TITLE: "香港公營醫療費用計算器（2026版）",
  DISCLAIMERS: {
    MAIN: "本工具僅供估算及參考用途，並不構成實際收費或任何資格判定。實際收費以醫管局系統及相關公告為準。",
    ASC: "「全年收費上限」須由病人主動申請並經審核後方可生效，並非自動套用；申請前已繳付的費用一般不會退款。",
    RESULTS_FOOTER:
      "本工具僅供估算及參考用途；實際收費以醫管局系統為準。「全年收費上限」需主動申請並經審核後方可生效。"
  },
  FEE_DISPLAY: {
    SOPC_VISIT: "專科門診診症費：HK$250／次",
    SOPC_MEDICATION: "專科門診藥費：HK$20／每4星期（系統按月估算）",
    GOPC_VISIT: "普通科門診診症費：HK$150／次",
    GOPC_MEDICATION: "普通科門診藥費：HK$5／每4星期（系統按月估算）",
    ASC_INFO: "ASC：HK$10,000（提示：需申請＋審核，非自動）"
  },
  FIELDS: {
    SPECIALTY_NAME: "專科名稱",
    SERVICE_TYPE: "服務類型",
    FOLLOWUP_FREQUENCY: "覆診頻率（每幾個月一次）",
    NEXT_FOLLOWUP_MONTH: "下次覆診月份",
    MEDICATION: "藥物數目（每月）",
    REMOVE: "移除"
  },
  SERVICE_TYPE_OPTIONS: {
    SOPC: "專科門診",
    GOPC: "普通科門診"
  },
  RESULTS: {
    SECTION_TITLE: "估算結果",
    MONTHLY_AVERAGE: "平均每月費用（估算）",
    ANNUAL_TOTAL: "全年累計費用（估算）",
    PEAK_MONTHS: "最高支出月份（估算）",
    EXPLANATION: "全年費用已按你輸入的覆診月份及藥物數目模擬分佈，個別月份可能明顯高於平均值。"
  },
  MONTHLY_DISTRIBUTION: {
    SECTION_TITLE: "全年費用分佈（按月份）",
    VISIT_FEES: "診症費",
    MEDICATION_FEES: "藥費",
    TOTAL: "合計"
  },
  ASC_ADVISORY: {
    SECTION_TITLE: "全年收費上限提示",
    COMMON_INFO:
      "醫管局設有全年收費上限安排（以每曆年1月1日至12月31日計算）。是否適用及生效安排以醫管局審核結果為準。",
    NOTICE: "按現時估算，你今年的公立醫療費用可能較高。你可留意醫管局設有全年收費上限安排。",
    ADVISORY:
      "按現時估算，你今年的公立醫療費用可能接近全年收費上限。建議及早了解相關安排（需主動申請並經審核）。",
    STRONG_ADVISORY:
      "按現時估算，你今年的公立醫療費用可能接近或超過全年收費上限。醫管局的全年收費上限需由病人主動申請並經審核後方可生效，並非自動套用。建議及早向醫務社會服務部或透過 HA Go 了解詳情。"
  },
  BUTTONS: {
    ADD_SPECIALTY: "新增專科",
    LEARN_MORE_ASC: "了解全年收費上限（ASC）",
    HOW_TO_APPLY: "如何申請（HA Go／繳費處）",
    CONTACT_MSS: "聯絡醫務社會服務部"
  }
} as const;
