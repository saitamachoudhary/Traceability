import { callWorkflowAPI } from '../utils/apiClient';
import { removeEmptyFields } from '../utils/removeEmptyFields';

/**
 * Fetches existing enquiry row data for the Edit form.
 * @param {string|number} id - The project ID from route params.
 */
export const getEnquiryEditData = async (id) => {
  return callWorkflowAPI({
    workflowId: "388c73d3-d20a-11f0-8d50-4be0661dac5c",
    variable: {
      project_id_for_Edit_offer: id
    },
    data: {
      appId: "af853ae1-c513-11f0-8899-af2975f8a698"
    }
  });
};

/**
 * Sends updated form data to the backend update workflow.
 * Only non-empty fields are included in the payload.
 * @param {string|number} id - The project ID from route params.
 * @param {object} formValues - The form values from react-hook-form.
 */
export const updateEnquiryData = async (id, formValues) => {
  const cleanedData = removeEmptyFields({
    appId: "af853ae1-c513-11f0-8899-af2975f8a698",
    customer: formValues.customer,
    projects: formValues.projects,
    packages: formValues.packages,
    scope: formValues.scope,
    enquiry_type: formValues.enquiry_type,
    offer_value: formValues.offer_value,
    client_enquiry_reference: formValues.client_enquiry_reference,
    responsible_sm: formValues.responsible_sm,
    currency: formValues.currency,
    offer_reference_no: formValues.offer_reference_no,
    plant_rating: formValues.plant_rating,
    plant_location: formValues.plant_location,
    enquiry_source: formValues.enquiry_source,
    enquiry_category: formValues.enquiry_category,
    offer_submission_planned_date: formValues.offer_submission_planned_date,
    actual_offer_date: formValues.actual_offer_date,
    conversion_rate: formValues.conversion_rate,
    ahpl_offer_status: formValues.ahpl_offer_status,
    customer_enquiry_status: formValues.customer_enquiry_status,
    backlog_hot: formValues.backlog_hot,
    remark: formValues.remark,
    client_enq_receipt_date: formValues.client_enq_receipt_date
  });

  return callWorkflowAPI({
    workflowId: "d11fbf7f-490c-11f1-8e18-97246f7a1806",
    variable: {
      project_id_for_Edit_offer: id
    },
    data: cleanedData
  });
};
