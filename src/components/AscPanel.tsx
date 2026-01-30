/**
 * AscPanel Component
 * Display ASC (Annual Spending Cap) advisory messages
 */

import type { AscPanelProps } from '../types';
import { UI_LABELS } from '../config';

export function AscPanel({ ascAdvisory }: AscPanelProps) {
  // Don't display if advisory level is none or not should_display
  if (!ascAdvisory.should_display) {
    return null;
  }

  // Get advisory text based on level
  let advisoryText = '';
  switch (ascAdvisory.level) {
    case 'notice':
      advisoryText = UI_LABELS.ASC_ADVISORY.NOTICE;
      break;
    case 'advisory':
      advisoryText = UI_LABELS.ASC_ADVISORY.ADVISORY;
      break;
    case 'strong_advisory':
      advisoryText = UI_LABELS.ASC_ADVISORY.STRONG_ADVISORY;
      break;
    default:
      return null;
  }

  return (
    <div className={`asc-panel asc-${ascAdvisory.level}`}>
      <h2>{UI_LABELS.ASC_ADVISORY.SECTION_TITLE}</h2>

      <div className="asc-common-info">
        {UI_LABELS.ASC_ADVISORY.COMMON_INFO}
      </div>

      <div className="asc-advisory-text">
        {advisoryText}
      </div>

      <div className="asc-actions">
        <a
          href="https://www.ha.org.hk/visitor/ha_visitor_index.asp?Parent_ID=10044&Content_ID=281820&Ver=HTML&Lang=CHIB5"
          target="_blank"
          rel="noopener noreferrer"
          className="asc-action-button"
        >
          {UI_LABELS.BUTTONS.LEARN_MORE_ASC}
        </a>
      </div>
    </div>
  );
}
