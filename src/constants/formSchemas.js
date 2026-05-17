// Field schemas that drive the unified <ProjectFormPage>.
// Adding a column = adding an entry here, not duplicating JSX.

const PLANT_LOCATIONS = [
  'INDIA', 'BHUTAN', 'VIETNAM', 'LAO PDR', 'INDONESIA', 'SRI LANKA',
  'BANGLADESH', 'NEPAL', 'MALAYSIA', 'PHILIPPINES', 'SOUTH AFRICA', 'OTHERS',
];

const AHPL_OFFER_STATUSES = [
  'Customer inputs awaited', 'Design inputs awaited', 'Field Services inputs awaited',
  'EPS inputs awaited', 'Manufacturing inputs awaited', 'AT inputs awaited',
  'Cost awaited from SCM', 'Cost awaited from IC', 'Cost awaited from AT',
  'Cost awaited from FS', 'Cost awaited from Planning', 'Cost awaited Proposal',
  'Site visit required', 'Offer Under Preparation', 'Offer Submitted',
  'BID Under preparation', 'Bid submitted', 'Tool approval pending',
  'REGRET', 'NO BID', 'FRC awaited',
];

const CUSTOMER_ENQUIRY_STATUSES = [
  'Budgetary requirement', 'Budget under approval', 'Offer under technical evaluation',
  'Offer under commercial evaluation', 'Under negotiation', 'Under Reverse Auction',
  'LOI received', 'Order received', 'Requirement dropped by Customer',
  'Enquiry on hold', 'Order Lost', 'Enquiry Cancelled', 'Others',
];

const trimRequired = (val) => (typeof val === 'string' && val.trim() === '' ? 'Cannot be empty spaces' : true);

export const ENQUIRY_FORM_FIELDS = [
  { name: 'offer_reference_no', label: 'Offer Reference No', type: 'text',  placeholder: 'Enter reference no', required: 'Offer Reference No is required', pattern: { value: /^[0-9]+$/, message: 'Must be a valid integer' } },
  { name: 'customer',           label: 'Customer Name',      type: 'text',  placeholder: 'Enter customer name', required: 'Customer Name is required', validate: trimRequired },
  { name: 'projects',           label: 'Projects',           type: 'text',  placeholder: 'Enter project name',  required: 'Project Name is required',  validate: trimRequired },
  { name: 'plant_rating',       label: 'Plant Rating',       type: 'text',  placeholder: 'Enter plant rating',  pattern: { value: /^[0-9]*$/, message: 'Must be a valid integer' } },
  { name: 'plant_location',     label: 'Plant Location',     type: 'select', placeholder: 'Select Location',    options: PLANT_LOCATIONS },
  { name: 'enquiry_source',     label: 'Enquiry Source',     type: 'select', placeholder: 'Select Source',      options: ['INTERNAL', 'EXTERNAL'] },
  { name: 'enquiry_type',       label: 'Enquiry Type',       type: 'select', placeholder: 'Select Type',        options: ['BUDGETARY', 'FIRM'] },
  { name: 'enquiry_category',   label: 'Enquiry Category',   type: 'select', placeholder: 'Select Category',    options: ['SUPPLY', 'SERVICE'] },
  { name: 'packages',           label: 'Package',            type: 'select', placeholder: 'Select Package',     options: ['TUR', 'GEN', 'DIRECT-AT', 'EBOP', 'MBOP', 'VALVE'] },
  { name: 'scope',                       label: 'Scope',                 type: 'text', placeholder: 'Enter scope' },
  { name: 'client_enquiry_reference',    label: 'Client Enquiry Ref No', type: 'text', placeholder: 'Enter client enquiry reference' },
  { name: 'offer_submission_planned_date', label: 'Offer Submission Planned Date', type: 'date', placeholder: 'Select planned date' },
  { name: 'client_enq_receipt_date',     label: 'Client Enq Receipt Date',         type: 'date', placeholder: 'Select Enq date' },
  { name: 'actual_offer_date',           label: 'Actual Offer Date',               type: 'date', placeholder: 'Select actual date' },
  { name: 'currency',                    label: 'Currency',                        type: 'select', placeholder: 'Select Currency', options: ['INR', 'EUR', 'USD'] },
  { name: 'offer_value',                 label: 'Offer Value',                     type: 'text',   placeholder: 'Enter offer value',     pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: 'Offer value must be numeric (decimal allowed)' } },
  { name: 'conversion_rate',             label: 'Conversion Rate',                 type: 'text',   placeholder: 'Enter conversion rate', pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: 'Must be a valid decimal number' } },
  { name: 'responsible_sm',              label: 'Responsible SM',                  type: 'text',   placeholder: 'Enter responsible SM' },
  { name: 'ahpl_offer_status',           label: 'AHPL Offer Status',               type: 'select', placeholder: 'Select Status', options: AHPL_OFFER_STATUSES },
  { name: 'customer_enquiry_status',     label: 'Customer Enquiry Status',         type: 'select', placeholder: 'Select Status', options: CUSTOMER_ENQUIRY_STATUSES },
  { name: 'backlog_hot',                 label: 'Backlog Hot',                     type: 'select', placeholder: 'Select', options: ['HOT', 'BACKLOG'] },
  { name: 'remark',                      label: 'Remark',                          type: 'textarea', placeholder: 'Enter remarks here...', fullWidth: true },
];

const intPattern = { value: /^-?[0-9]+$/, message: 'Must be a valid integer' };
const decPattern = { value: /^[0-9]+(\.[0-9]+)?$/, message: 'Must be a valid decimal number' };

export const O2S_EDIT_FORM_FIELDS = [
  { name: 'oi_month',                                  label: 'OI Month',                  type: 'date',   placeholder: 'Select OI Month' },
  { name: 'scope_description',                         label: 'Scope Description',         type: 'text',   placeholder: 'Enter scope description' },
  { name: 'location_hip_hib',                          label: 'Location (HIP/HIB)',        type: 'select', placeholder: 'Select Location', options: ['HIP', 'HIB'] },
  { name: 'cogsII_fcst_act_comt_tbc',                  label: 'COGS II FCST ACT COMT TBC', type: 'text',   placeholder: 'Enter COGS II',         pattern: decPattern },
  { name: 'raw_material_material_receipt_grn_planned', label: 'Raw Material GRN Planned',  type: 'date',   placeholder: 'Select GRN Planned Date' },
  { name: 'expected_delivery_date',                    label: 'Expected Delivery Date',    type: 'date',   placeholder: 'Select Expected Delivery' },
  { name: 'bom_planned_days',                          label: 'BOM Planned Days',          type: 'text',   placeholder: 'Enter BOM planned days', pattern: intPattern },
  { name: 'pr_planned_days',                           label: 'PR Planned Days',           type: 'text',   placeholder: 'Enter PR planned days',  pattern: intPattern },
  { name: 'manufacturing_planned_days',                label: 'Manufacturing Planned Days',type: 'text',   placeholder: 'Enter manufacturing days', pattern: intPattern },
  { name: 'placement_planned_days',                    label: 'Placement Planned Days',    type: 'text',   placeholder: 'Enter placement days',   pattern: intPattern },
  { name: 'remarks',                                   label: 'Remarks',                   type: 'textarea', placeholder: 'Enter remarks here...', fullWidth: true },
];
