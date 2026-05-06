import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import { useSaveEnquiry } from '../hooks/useSaveEnquiry';

export default function AddEnquiry() {
  const navigate = useNavigate();
  const { handleSave } = useSaveEnquiry();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    await handleSave(data);
  };

  // Reusable styles based on the design system
  const labelStyle = "block text-[12px] font-bold tracking-[0.06em] uppercase text-[#475569] mb-2";
  const inputStyle = "w-full h-[48px] rounded-[10px] border border-[#cbd5e1] bg-white px-[14px] text-[14px] text-[#1e293b] focus:border-2 focus:border-[#004274] focus:ring-[3px] focus:ring-[#004274]/10 focus:outline-none transition-all placeholder-[#9da3ae]";
  const errorStyle = "text-[12px] text-[#dc2626] mt-1 block";

  return (
    <main className="flex-1 w-full px-8 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-[#0f3d66]">Project Details</h1>
        <button
          onClick={() => navigate('/e2o')}
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

            {/* 1. offer_reference_no */}
            <div>
              <label className={labelStyle}>Offer Reference No *</label>
              <input
                {...register("offer_reference_no", {
                  required: "Offer Reference No is required",
                  pattern: { value: /^[0-9]+$/, message: "Must be a valid integer" }
                })}
                className={inputStyle}
                placeholder="Enter reference no"
              />
              {errors.offer_reference_no && <span className={errorStyle}>{errors.offer_reference_no.message}</span>}
            </div>

            {/* 2. customer */}
            <div>
              <label className={labelStyle}>Customer Name *</label>
              <input
                {...register("customer", {
                  required: "Customer Name is required",
                  validate: (val) => val.trim() !== "" || "Cannot be empty spaces"
                })}
                className={inputStyle}
                placeholder="Enter customer name"
              />
              {errors.customer && <span className={errorStyle}>{errors.customer.message}</span>}
            </div>

            {/* 3. projects */}
            <div>
              <label className={labelStyle}>Projects *</label>
              <input
                {...register("projects", {
                  required: "Project Name is required",
                  validate: (val) => val.trim() !== "" || "Cannot be empty spaces"
                })}
                className={inputStyle}
                placeholder="Enter project name"
              />
              {errors.projects && <span className={errorStyle}>{errors.projects.message}</span>}
            </div>

            {/* 4. plant_rating */}
            <div>
              <label className={labelStyle}>Plant Rating</label>
              <input
                {...register("plant_rating", {
                  pattern: { value: /^[0-9]*$/, message: "Must be a valid integer" }
                })}
                className={inputStyle}
                placeholder="Enter plant rating"
              />
              {errors.plant_rating && <span className={errorStyle}>{errors.plant_rating.message}</span>}
            </div>

            {/* 5. plant_location */}
            <div>
              <label className={labelStyle}>Plant Location</label>
              <Controller
                name="plant_location"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Location"
                    options={["INDIA", "BHUTAN", "VIETNAM", "LAO PDR", "INDONESIA", "SRI LANKA", "BANGLADESH", "NEPAL", "MALAYSIA", "PHILIPPINES", "SOUTH AFRICA", "OTHERS"]}
                  />
                )}
              />
            </div>

            {/* 6. enquiry_source */}
            <div>
              <label className={labelStyle}>Enquiry Source</label>
              <Controller
                name="enquiry_source"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Source"
                    options={["INTERNAL", "EXTERNAL"]}
                  />
                )}
              />
            </div>

            {/* 7. enquiry_type */}
            <div>
              <label className={labelStyle}>Enquiry Type</label>
              <Controller
                name="enquiry_type"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Type"
                    options={["BUDGETARY", "FIRM"]}
                  />
                )}
              />
            </div>

            {/* 8. enquiry_category */}
            <div>
              <label className={labelStyle}>Enquiry Category</label>
              <Controller
                name="enquiry_category"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Category"
                    options={["SUPPLY", "SERVICE"]}
                  />
                )}
              />
            </div>

            {/* 9. packages */}
            <div>
              <label className={labelStyle}>Package</label>
              <Controller
                name="packages"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Package"
                    options={["TUR", "GEN", "DIRECT-AT", "EBOP", "MBOP", "VALVE"]}
                  />
                )}
              />
            </div>

            {/* 10. scope */}
            <div>
              <label className={labelStyle}>Scope</label>
              <input {...register("scope")} className={inputStyle} placeholder="Enter scope" />
            </div>

            {/* 11. client_enquiry_reference */}
            <div>
              <label className={labelStyle}>Client Enquiry Ref No</label>
              <input {...register("client_enquiry_reference")} className={inputStyle} placeholder="Enter client enquiry reference" />
            </div>

            {/* 12. offer_submission_planned_date */}
            <div>
              <label className={labelStyle}>Offer Submission Planned Date</label>
              <Controller
                name="offer_submission_planned_date"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    placeholder="Select planned date"
                  />
                )}
              />
            </div>
            {/* 13. client_enq_receipt_date */}
            <div>
              <label className={labelStyle}>Client Enq Receipt Date</label>
              <Controller
                name="client_enq_receipt_date"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    placeholder="Select Enq date"
                  />
                )}
              />
            </div>

            {/* NEW FIELD: actual_offer_date */}
            <div>
              <label className={labelStyle}>Actual Offer Date</label>
              <Controller
                name="actual_offer_date"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    placeholder="Select actual date"
                  />
                )}
              />
            </div>

            {/* 13. currency */}
            <div>
              <label className={labelStyle}>Currency</label>
              <Controller
                name="currency"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Currency"
                    options={["INR", "EUR", "USD"]}
                  />
                )}
              />
            </div>

            {/* 14. offer_value */}
            <div>
              <label className={labelStyle}>Offer Value</label>
              <input
                {...register("offer_value", {
                  pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Offer value must be numeric (decimal allowed)" }
                })}
                className={inputStyle}
                placeholder="Enter offer value"
              />
              {errors.offer_value && <span className={errorStyle}>{errors.offer_value.message}</span>}
            </div>

            {/* 15. conversion_rate */}
            <div>
              <label className={labelStyle}>Conversion Rate</label>
              <input
                {...register("conversion_rate", {
                  pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Must be a valid decimal number" }
                })}
                className={inputStyle}
                placeholder="Enter conversion rate"
              />
              {errors.conversion_rate && <span className={errorStyle}>{errors.conversion_rate.message}</span>}
            </div>

            {/* 16. responsible_sm */}
            <div>
              <label className={labelStyle}>Responsible SM</label>
              <input {...register("responsible_sm")} className={inputStyle} placeholder="Enter responsible SM" />
            </div>

            {/* 17. ahpl_offer_status */}
            <div>
              <label className={labelStyle}>AHPL Offer Status</label>
              <Controller
                name="ahpl_offer_status"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Status"
                    options={[
                      "Customer inputs awaited", "Design inputs awaited", "Field Services inputs awaited", "EPS inputs awaited",
                      "Manufacturing inputs awaited", "AT inputs awaited", "Cost awaited from SCM", "Cost awaited from IC",
                      "Cost awaited from AT", "Cost awaited from FS", "Cost awaited from Planning", "Cost awaited Proposal",
                      "Site visit required", "Offer Under Preparation", "Offer Submitted", "BID Under preparation",
                      "Bid submitted", "Tool approval pending", "REGRET", "NO BID", "FRC awaited"
                    ]}
                  />
                )}
              />
            </div>

            {/* 18. customer_enquiry_status */}
            <div>
              <label className={labelStyle}>Customer Enquiry Status</label>
              <Controller
                name="customer_enquiry_status"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select Status"
                    options={[
                      "Budgetary requirement", "Budget under approval", "Offer under technical evaluation",
                      "Offer under commercial evaluation", "Under negotiation", "Under Reverse Auction",
                      "LOI received", "Order received", "Requirement dropped by Customer", "Enquiry on hold",
                      "Order Lost", "Enquiry Cancelled", "Others"
                    ]}
                  />
                )}
              />
            </div>

            {/* 20. backlog_hot */}
            <div>
              <label className={labelStyle}>Backlog Hot</label>
              <Controller
                name="backlog_hot"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Select"
                    options={["HOT", "BACKLOG"]}
                  />
                )}
              />
            </div>

            {/* 19. remark (span multiple columns if needed, but per requirement it's in the grid) */}
            <div className="md:col-span-2 lg:col-span-4">
              <label className={labelStyle}>Remark</label>
              <textarea
                {...register("remark")}
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
              onClick={() => navigate('/e2o')}
              className="bg-white border border-[#cbd5e1] text-[#475569] h-[44px] px-6 rounded-[10px] font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#004274] text-white h-[44px] px-6 rounded-[10px] font-bold hover:bg-[#00335a] transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
