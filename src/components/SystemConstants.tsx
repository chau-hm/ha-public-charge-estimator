/**
 * SystemConstants Component
 * Display read-only system fee information
 */

import { UI_LABELS } from '../config';

export function SystemConstants() {
  return (
    <div className="system-constants">
      <h3>系統收費（唯讀）</h3>
      <ul>
        <li>{UI_LABELS.FEE_DISPLAY.SOPC_VISIT}</li>
        <li>{UI_LABELS.FEE_DISPLAY.SOPC_MEDICATION}</li>
        <li>{UI_LABELS.FEE_DISPLAY.GOPC_VISIT}</li>
        <li>{UI_LABELS.FEE_DISPLAY.GOPC_MEDICATION}</li>
        <li>{UI_LABELS.FEE_DISPLAY.ASC_INFO}</li>
      </ul>
    </div>
  );
}
