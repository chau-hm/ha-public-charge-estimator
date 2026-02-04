/**
 * SystemConstants Component
 * Display read-only system fee information
 */

import { UI_LABELS } from '../config';

export function SystemConstants() {
  return (
    <div className="system-constants">
      <h3>🔧 系統常數</h3>
      <p style={{ fontSize: '12px', color: '#888', marginBottom: '12px', lineHeight: '1.6' }}>
        以下收費由醫管局統一規定，不可更改：
      </p>
      <ul>
        <li>{UI_LABELS.FEE_DISPLAY.SOPC_VISIT}</li>
        <li>{UI_LABELS.FEE_DISPLAY.SOPC_MEDICATION}</li>
        <li>{UI_LABELS.FEE_DISPLAY.GOPC_VISIT}</li>
        <li>{UI_LABELS.FEE_DISPLAY.GOPC_MEDICATION}</li>
        <li>{UI_LABELS.FEE_DISPLAY.PATHOLOGY_ADVANCED}</li>
        <li>{UI_LABELS.FEE_DISPLAY.PATHOLOGY_PREMIUM}</li>
        <li>{UI_LABELS.FEE_DISPLAY.RADIOLOGY_ADVANCED}</li>
        <li>{UI_LABELS.FEE_DISPLAY.RADIOLOGY_PREMIUM}</li>
        <li>{UI_LABELS.FEE_DISPLAY.ASC_INFO}</li>
      </ul>
    </div>
  );
}
