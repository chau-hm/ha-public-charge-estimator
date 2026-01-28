/**
 * SpecialtyTable Component
 * Editable table for specialty inputs (no fee inputs allowed)
 */

import type { SpecialtyInput, SpecialtyTableProps, MonthNumber } from '../types';
import { UI_LABELS, FOLLOWUP_FREQUENCIES, SERVICE_TYPES } from '../config';

export function SpecialtyTable({
  specialties,
  onAdd,
  onRemove,
  onUpdate,
}: SpecialtyTableProps) {
  const handleFieldChange = (
    index: number,
    field: keyof SpecialtyInput,
    value: string | number
  ) => {
    const updated = { ...specialties[index], [field]: value };
    onUpdate(index, updated);
  };

  return (
    <div className="specialty-table">
      <h2>你的專科與覆診資料</h2>

      {specialties.length > 0 && (
        <>
          {/* 桌面版表格 */}
          <div className="table-container desktop-only">
            <table>
              <thead>
                <tr>
                  <th>{UI_LABELS.FIELDS.SPECIALTY_NAME}</th>
                  <th>{UI_LABELS.FIELDS.SERVICE_TYPE}</th>
                  <th>{UI_LABELS.FIELDS.FOLLOWUP_FREQUENCY}</th>
                  <th>{UI_LABELS.FIELDS.NEXT_FOLLOWUP_MONTH}</th>
                  <th>{UI_LABELS.FIELDS.MEDICATION}</th>
                  <th>{UI_LABELS.FIELDS.REMOVE}</th>
                </tr>
              </thead>
              <tbody>
                {specialties.map((specialty, index) => (
                  <tr key={specialty.id || index}>
                    <td>
                      <input
                        type="text"
                        value={specialty.specialty_label}
                        onChange={(e) =>
                          handleFieldChange(index, 'specialty_label', e.target.value)
                        }
                        placeholder="例：內科"
                      />
                    </td>
                    <td>
                      <select
                        value={specialty.service_type}
                        onChange={(e) =>
                          handleFieldChange(index, 'service_type', e.target.value)
                        }
                      >
                        <option value={SERVICE_TYPES.SOPC}>
                          {UI_LABELS.SERVICE_TYPE_OPTIONS.SOPC}
                        </option>
                        <option value={SERVICE_TYPES.GOPC}>
                          {UI_LABELS.SERVICE_TYPE_OPTIONS.GOPC}
                        </option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={specialty.followup_frequency_months}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            'followup_frequency_months',
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {FOLLOWUP_FREQUENCIES.map((freq) => (
                          <option key={freq} value={freq}>
                            每 {freq} 個月
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={specialty.next_followup_month}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            'next_followup_month',
                            parseInt(e.target.value) as MonthNumber
                          )
                        }
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month}>
                            {month}月
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={specialty.medication_tier}
                        onChange={(e) =>
                          handleFieldChange(index, 'medication_tier', e.target.value)
                        }
                      >
                        <option value="none">
                          {UI_LABELS.MEDICATION_TIER_OPTIONS.NONE}
                        </option>
                        <option value="low">
                          {UI_LABELS.MEDICATION_TIER_OPTIONS.LOW}
                        </option>
                        <option value="medium">
                          {UI_LABELS.MEDICATION_TIER_OPTIONS.MEDIUM}
                        </option>
                        <option value="high">
                          {UI_LABELS.MEDICATION_TIER_OPTIONS.HIGH}
                        </option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => onRemove(index)}
                        className="remove-button"
                        aria-label={`${UI_LABELS.FIELDS.REMOVE} ${specialty.specialty_label}`}
                      >
                        {UI_LABELS.FIELDS.REMOVE}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 手機版卡片 */}
          <div className="specialty-cards mobile-only">
            {specialties.map((specialty, index) => (
              <div key={specialty.id || index} className="specialty-card">
                <div className="card-field">
                  <label>{UI_LABELS.FIELDS.SPECIALTY_NAME}</label>
                  <input
                    type="text"
                    value={specialty.specialty_label}
                    onChange={(e) =>
                      handleFieldChange(index, 'specialty_label', e.target.value)
                    }
                    placeholder="例：內科"
                  />
                </div>

                <div className="card-field">
                  <label>{UI_LABELS.FIELDS.SERVICE_TYPE}</label>
                  <select
                    value={specialty.service_type}
                    onChange={(e) =>
                      handleFieldChange(index, 'service_type', e.target.value)
                    }
                  >
                    <option value={SERVICE_TYPES.SOPC}>
                      {UI_LABELS.SERVICE_TYPE_OPTIONS.SOPC}
                    </option>
                    <option value={SERVICE_TYPES.GOPC}>
                      {UI_LABELS.SERVICE_TYPE_OPTIONS.GOPC}
                    </option>
                  </select>
                </div>

                <div className="card-field">
                  <label>{UI_LABELS.FIELDS.FOLLOWUP_FREQUENCY}</label>
                  <select
                    value={specialty.followup_frequency_months}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        'followup_frequency_months',
                        parseInt(e.target.value)
                      )
                    }
                  >
                    {FOLLOWUP_FREQUENCIES.map((freq) => (
                      <option key={freq} value={freq}>
                        每 {freq} 個月
                      </option>
                    ))}
                  </select>
                </div>

                <div className="card-field">
                  <label>{UI_LABELS.FIELDS.NEXT_FOLLOWUP_MONTH}</label>
                  <select
                    value={specialty.next_followup_month}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        'next_followup_month',
                        parseInt(e.target.value) as MonthNumber
                      )
                    }
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month}>
                        {month}月
                      </option>
                    ))}
                  </select>
                </div>

                <div className="card-field">
                  <label>{UI_LABELS.FIELDS.MEDICATION}</label>
                  <select
                    value={specialty.medication_tier}
                    onChange={(e) =>
                      handleFieldChange(index, 'medication_tier', e.target.value)
                    }
                  >
                    <option value="none">
                      {UI_LABELS.MEDICATION_TIER_OPTIONS.NONE}
                    </option>
                    <option value="low">
                      {UI_LABELS.MEDICATION_TIER_OPTIONS.LOW}
                    </option>
                    <option value="medium">
                      {UI_LABELS.MEDICATION_TIER_OPTIONS.MEDIUM}
                    </option>
                    <option value="high">
                      {UI_LABELS.MEDICATION_TIER_OPTIONS.HIGH}
                    </option>
                  </select>
                </div>

                <button
                  onClick={() => onRemove(index)}
                  className="remove-button card-remove"
                  aria-label={`${UI_LABELS.FIELDS.REMOVE} ${specialty.specialty_label}`}
                >
                  {UI_LABELS.FIELDS.REMOVE}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={onAdd} className="add-button primary">
        {UI_LABELS.BUTTONS.ADD_SPECIALTY}
      </button>

      <p className="helper-text">
        藥物數量級只用於估算補藥節奏與高峰風險，並不代表藥價或臨床判斷。
      </p>
    </div>
  );
}
