import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, Loader2 } from 'lucide-react';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import { useEditO2S } from '../hooks/useEditO2S';

export default function EditOrderToShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { defaultValues, isFetching, fetchError, handleUpdate } = useEditO2S(id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  // Once data is fetched, reset form with pre-filled values
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    await handleUpdate(data);
  };

  // Design system tokens
  const labelStyle = "block text-[12px] font-bold tracking-[0.06em] uppercase text-[#475569] mb-2";
  const inputStyle = "w-full h-[48px] rounded-[10px] border border-[#cbd5e1] bg-white px-[14px] text-[14px] text-[#1e293b] focus:border-2 focus:border-[#004274] focus:ring-[3px] focus:ring-[#004274]/10 focus:outline-none transition-all placeholder-[#9da3ae]";
  const errorStyle = "text-[12px] text-[#dc2626] mt-1 block";

  // Loading state while fetching existing data
  if (isFetching) {
    return (
      <main className="flex-1 w-full px-8 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-bold text-[#0f3d66]">Project Details Edit</h1>
          <button
            onClick={() => navigate('/o2s')}
            className="flex items-center gap-2 bg-white border border-[#cbd5e1] text-[#0f3d66] px-4 py-2 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-[28px] border border-[#e2e8f0] shadow-sm flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-[#64748b]">
            <Loader2 className="w-10 h-10 animate-spin text-[#004274]" />
            <p className="text-[15px] font-medium">Loading project data...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state if fetch completely failed
  if (fetchError && !defaultValues) {
    return (
      <main className="flex-1 w-full px-8 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-bold text-[#0f3d66]">Project Details Edit</h1>
          <button
            onClick={() => navigate('/o2s')}
            className="flex items-center gap-2 bg-white border border-[#cbd5e1] text-[#0f3d66] px-4 py-2 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-[28px] border border-[#e2e8f0] shadow-sm flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[18px] font-bold text-[#dc2626]">Failed to load data</p>
            <p className="text-[14px] text-[#64748b]">Could not retrieve project information. Please go back and try again.</p>
            <button
              onClick={() => navigate('/o2s')}
              className="mt-4 bg-[#004274] text-white px-6 py-2 rounded-[10px] font-bold hover:bg-[#00335a] transition-colors cursor-pointer"
            >
              Back to Order to Shipment
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full px-8 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-[#0f3d66]">Project Details Edit</h1>
        <button
          onClick={() => navigate('/o2s')}
          className="flex items-center gap-2 bg-white border border-[#cbd5e1] text-[#0f3d66] px-4 py-2 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[20px] p-[28px] border border-[#e2e8f0] shadow-sm">
        <div className="mb-8">
          <h2 className="text-[16px] font-bold text-[#1e293b]">General Information</h2>
          <p className="text-[14px] text-[#64748b]">Update technical specifications and project tracking details.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">

            {/* 1. oi_month */}
            <div>
              <label className={labelStyle}>OI Month</label>
              <Controller
                name="oi_month"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Select OI Month"
                  />
                )}
              />
            </div>

            {/* 2. scope_description */}
            <div>
              <label className={labelStyle}>Scope Description</label>
              <input
                {...register("scope_description")}
                className={inputStyle}
                placeholder="Enter scope description"
              />
            </div>

            {/* 3. location_hip_hib */}
            <div>
              <label className={labelStyle}>Location (HIP/HIB)</label>
              <Controller
                name="location_hip_hib"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Select Location"
                    options={["HIP", "HIB"]}
                  />
                )}
              />
            </div>

            {/* 4. cogsII_fcst_act_comt_tbc */}
            <div>
              <label className={labelStyle}>COGS II FCST ACT COMT TBC</label>
              <input
                {...register("cogsII_fcst_act_comt_tbc", {
                  pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Must be a valid decimal number" }
                })}
                className={inputStyle}
                placeholder="Enter COGS II"
              />
              {errors.cogsII_fcst_act_comt_tbc && <span className={errorStyle}>{errors.cogsII_fcst_act_comt_tbc.message}</span>}
            </div>

            {/* 5. raw_material_material_receipt_grn_planned */}
            <div>
              <label className={labelStyle}>Raw Material GRN Planned</label>
              <Controller
                name="raw_material_material_receipt_grn_planned"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Select GRN Planned Date"
                  />
                )}
              />
            </div>

            {/* 6. expected_delivery_date */}
            <div>
              <label className={labelStyle}>Expected Delivery Date</label>
              <Controller
                name="expected_delivery_date"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Select Expected Delivery"
                  />
                )}
              />
            </div>

            {/* 7. bom_planned_days */}
            <div>
              <label className={labelStyle}>BOM Planned Days</label>
              <input
                {...register("bom_planned_days", {
                  pattern: { value: /^-?[0-9]+$/, message: "Must be a valid integer" }
                })}
                className={inputStyle}
                placeholder="Enter BOM planned days"
              />
              {errors.bom_planned_days && <span className={errorStyle}>{errors.bom_planned_days.message}</span>}
            </div>

            {/* 8. pr_planned_days */}
            <div>
              <label className={labelStyle}>PR Planned Days</label>
              <input
                {...register("pr_planned_days", {
                  pattern: { value: /^-?[0-9]+$/, message: "Must be a valid integer" }
                })}
                className={inputStyle}
                placeholder="Enter PR planned days"
              />
              {errors.pr_planned_days && <span className={errorStyle}>{errors.pr_planned_days.message}</span>}
            </div>

            {/* 9. manufacturing_planned_days */}
            <div>
              <label className={labelStyle}>Manufacturing Planned Days</label>
              <input
                {...register("manufacturing_planned_days", {
                  pattern: { value: /^-?[0-9]+$/, message: "Must be a valid integer" }
                })}
                className={inputStyle}
                placeholder="Enter manufacturing days"
              />
              {errors.manufacturing_planned_days && <span className={errorStyle}>{errors.manufacturing_planned_days.message}</span>}
            </div>

            {/* 10. placement_planned_days */}
            <div>
              <label className={labelStyle}>Placement Planned Days</label>
              <input
                {...register("placement_planned_days", {
                  pattern: { value: /^-?[0-9]+$/, message: "Must be a valid integer" }
                })}
                className={inputStyle}
                placeholder="Enter placement days"
              />
              {errors.placement_planned_days && <span className={errorStyle}>{errors.placement_planned_days.message}</span>}
            </div>

            {/* 11. remarks — full-width */}
            <div className="md:col-span-2 lg:col-span-4">
              <label className={labelStyle}>Remarks</label>
              <textarea
                {...register("remarks")}
                className={`${inputStyle} h-[100px] py-[14px] resize-none`}
                placeholder="Enter remarks here..."
              ></textarea>
            </div>

          </div>

          <hr className="my-8 border-[#e2e8f0]" />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/o2s')}
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
                  Updating...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
