import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import PageHeader from './PageHeader';
import CustomSelect from './CustomSelect';
import CustomDatePicker from './CustomDatePicker';

const LABEL_CLASS = 'block text-[12px] font-bold tracking-[0.06em] uppercase text-[#475569] mb-2';
const INPUT_CLASS = 'w-full h-[48px] rounded-[10px] border border-[#cbd5e1] bg-white px-[14px] text-[14px] text-[#1e293b] focus:border-2 focus:border-[#004274] focus:ring-[3px] focus:ring-[#004274]/10 focus:outline-none transition-all placeholder-[#9da3ae]';
const ERROR_CLASS = 'text-[12px] text-[#dc2626] mt-1 block';

/**
 * Schema-driven page used for AddEnquiry, EditEnquiry, and EditOrderToShipment.
 *
 * Props:
 *   title              - main page title (e.g. "Project Details" / "Project Details Edit")
 *   sectionTitle       - container subtitle, default "General Information"
 *   sectionDescription - container body text
 *   backTo             - route to navigate to on back / cancel
 *   backLabel          - label for the (error-state) back-to button
 *   fields             - schema array (see constants/formSchemas.js)
 *   mode               - 'add' | 'edit'
 *   defaultValues      - pre-filled values (edit mode only)
 *   isFetching         - shows full-page loader (edit mode only)
 *   fetchError         - shows full-page error block (edit mode only)
 *   onSubmit           - handler called with form values
 *   submitLabel        - idle submit-button text (default 'Save')
 *   submittingLabel    - in-flight submit-button text (default 'Saving...')
 */
export default function ProjectFormPage({
  title,
  sectionTitle = 'General Information',
  sectionDescription = 'Update technical specifications and project tracking details.',
  backTo,
  backLabel = 'Back',
  fields,
  mode = 'add',
  defaultValues = null,
  isFetching = false,
  fetchError = false,
  onSubmit,
  submitLabel = 'Save',
  submittingLabel = 'Saving...',
}) {
  const navigate = useNavigate();

  const {
    register, handleSubmit, reset, control,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  // In edit mode, hydrate the form once defaultValues arrive.
  useEffect(() => {
    if (mode === 'edit' && defaultValues) reset(defaultValues);
  }, [defaultValues, reset, mode]);

  // ── Loading state (edit only) ───────────────────────────────────────────
  if (mode === 'edit' && isFetching) {
    return (
      <main className="flex-1 w-full px-8 py-8 flex flex-col gap-6">
        <PageHeader title={title} backTo={backTo} />
        <div className="bg-white rounded-[20px] p-[28px] border border-[#e2e8f0] shadow-sm flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-[#64748b]">
            <Loader2 className="w-10 h-10 animate-spin text-[#004274]" />
            <p className="text-[15px] font-medium">Loading project data...</p>
          </div>
        </div>
      </main>
    );
  }

  // ── Error state (edit only) ─────────────────────────────────────────────
  if (mode === 'edit' && fetchError && !defaultValues) {
    return (
      <main className="flex-1 w-full px-8 py-8 flex flex-col gap-6">
        <PageHeader title={title} backTo={backTo} />
        <div className="bg-white rounded-[20px] p-[28px] border border-[#e2e8f0] shadow-sm flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[18px] font-bold text-[#dc2626]">Failed to load data</p>
            <p className="text-[14px] text-[#64748b]">Could not retrieve project information. Please go back and try again.</p>
            <button
              onClick={() => navigate(backTo)}
              className="mt-4 bg-[#004274] text-white px-6 py-2 rounded-[10px] font-bold hover:bg-[#00335a] transition-colors cursor-pointer"
            >
              {backLabel}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Render a single field from the schema ──────────────────────────────
  const renderField = (f) => {
    const wrapperClass = f.fullWidth ? 'md:col-span-2 lg:col-span-4' : '';
    const label = (
      <label className={LABEL_CLASS}>
        {f.label}{f.required && ' *'}
      </label>
    );

    if (f.type === 'select') {
      return (
        <div key={f.name} className={wrapperClass}>
          {label}
          <Controller
            name={f.name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                value={value || ''}
                onChange={onChange}
                placeholder={f.placeholder}
                options={f.options}
              />
            )}
          />
        </div>
      );
    }

    if (f.type === 'date') {
      return (
        <div key={f.name} className={wrapperClass}>
          {label}
          <Controller
            name={f.name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                value={value || ''}
                onChange={onChange}
                placeholder={f.placeholder}
              />
            )}
          />
        </div>
      );
    }

    if (f.type === 'textarea') {
      return (
        <div key={f.name} className={wrapperClass}>
          {label}
          <textarea
            {...register(f.name)}
            className={`${INPUT_CLASS} h-[100px] py-[14px] resize-none`}
            placeholder={f.placeholder}
          />
        </div>
      );
    }

    // default: text input
    const rules = {};
    if (f.required) rules.required = f.required;
    if (f.pattern)  rules.pattern  = f.pattern;
    if (f.validate) rules.validate = f.validate;

    return (
      <div key={f.name} className={wrapperClass}>
        {label}
        <input
          {...register(f.name, rules)}
          className={INPUT_CLASS}
          placeholder={f.placeholder}
        />
        {errors[f.name] && <span className={ERROR_CLASS}>{errors[f.name].message}</span>}
      </div>
    );
  };

  // ── Normal render ───────────────────────────────────────────────────────
  return (
    <main className="flex-1 w-full px-8 py-8 flex flex-col gap-6">
      <PageHeader title={title} backTo={backTo} />

      <div className="bg-white rounded-[20px] p-[28px] border border-[#e2e8f0] shadow-sm">
        <div className="mb-8">
          <h2 className="text-[16px] font-bold text-[#1e293b]">{sectionTitle}</h2>
          <p className="text-[14px] text-[#64748b]">{sectionDescription}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            {fields.map(renderField)}
          </div>

          <hr className="my-8 border-[#e2e8f0]" />

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(backTo)}
              className="bg-white border border-[#cbd5e1] text-[#475569] h-[44px] px-6 rounded-[10px] font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#004274] text-white h-[44px] px-6 rounded-[10px] font-bold hover:bg-[#00335a] transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {submittingLabel}
                </>
              ) : (
                submitLabel
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
