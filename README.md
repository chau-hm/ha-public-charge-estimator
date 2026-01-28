# 公眾醫療費用計算器（香港醫管局制度版）

> 目標：把香港醫管局（HA）公眾收費制度轉譯成病人可理解的「月／年」費用估算，並提供全年收費上限（ASC）提示（僅提示，不作資格判定）。

---

## 核心原則（請勿違反）
1. **所有 HK$ 收費金額及 ASC 金額為系統常數**（由 `fees_spec.json` / `src/config.ts` 提供），**用戶不可輸入任何金額**。
2. **ASC = HK$10,000**（曆年計算），**非自動套用**，必須主動申請並經審核。
3. 藥物不可用「有／無」二元；必須使用 tier：`none/low/medium/high`。
4. 每科必須有 **下次覆診月份（1–12）**，用於月度分佈與高峰月份推算。
5. 所有文案以 `spec/ui_copy_zh_hant.md` 為準，避免政策語義錯誤。

---

## Repo 結構

/spec
PRD.md
constitution_prompt.txt
task_prompt.txt
fees_spec.json
golden_cases.json
ui_copy_zh_hant.md
ui_wireframe.md
DATA_MODEL.md
config.schema.json
/src
config.ts
types.ts
calc.ts
App.tsx
components/*
dev/goldenCheck.ts
/tests
calc.golden.test.ts
---

## 安裝與啟動

```bash
npm install
npm run dev
```

## 跑 Golden Cases 回歸測試

方式 A：單元測試（推薦）
npm run test

方式 B：開發時手動檢查（console）
npm run golden:check
