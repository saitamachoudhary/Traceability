import { Filter } from 'lucide-react';
import SearchableSelect from './SearchableSelect';

/**
 * Schema-driven filter toolbar shared by E2O and O2S.
 *
 * Each entry in `fields` defines:
 *   key         - the filter key inside `filters` and the change callback
 *   optionKey   - the matching key inside `options`
 *   label       - dropdown label
 *   placeholder - dropdown placeholder
 *   width       - optional fixed width (used in O2S layout); falsy means flex
 */
export default function FilterToolbar({
  filters,
  options,
  isLoading,
  onChange,
  fields,
  variant = 'flex', // 'flex' (E2O look) | 'fixed' (O2S look with 360px slots)
}) {
  const containerClass = variant === 'fixed'
    ? 'w-full bg-white rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4 shadow-[var(--shadow-default)] border border-[#EEF2F7]'
    : 'w-full mt-6 bg-surface rounded-2xl p-6 shadow-[var(--shadow-default)] flex flex-col xl:flex-row xl:items-end justify-between gap-6';

  const fieldsWrapperClass = variant === 'fixed'
    ? 'flex flex-wrap items-end gap-4 flex-1'
    : 'flex flex-1 items-end gap-4 flex-wrap';

  return (
    <div className={containerClass}>
      <div className={variant === 'fixed' ? 'flex items-center gap-2 text-text-secondary font-bold text-[12px] uppercase tracking-wider shrink-0' : 'flex items-center gap-6 flex-1'}>
        <div className="flex items-center gap-2 text-text-secondary font-bold text-[12px] uppercase tracking-wider shrink-0">
          <Filter className="w-4 h-4" />
          FILTERS
        </div>

        {variant !== 'fixed' && (
          <div className={fieldsWrapperClass}>
            {fields.map(f => (
              <SearchableSelect
                key={f.key}
                label={f.label}
                placeholder={f.placeholder}
                value={filters[f.key] ?? ''}
                options={options[f.optionKey] ?? []}
                onChange={val => onChange(f.key, val)}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
      </div>

      {variant === 'fixed' && (
        <>
          <div className="w-px h-5 bg-[#EEF2F7] shrink-0" />
          <div className={fieldsWrapperClass}>
            {fields.map(f => (
              <div key={f.key} className="w-[360px] min-w-[180px]">
                <SearchableSelect
                  label={f.label}
                  placeholder={f.placeholder}
                  value={filters[f.key] ?? ''}
                  options={options[f.optionKey] ?? []}
                  onChange={val => onChange(f.key, val)}
                  isLoading={isLoading}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {variant !== 'fixed' && (
        <div className="shrink-0 flex items-end gap-3 h-[58px]" />
      )}
    </div>
  );
}
