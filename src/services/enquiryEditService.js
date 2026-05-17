import { callWorkflow } from '../utils/apiClient';
import { removeEmptyFields } from '../utils/removeEmptyFields';
import { APP_ID } from '../constants/api';
import { WORKFLOWS } from '../constants/workflows';

const E2O = WORKFLOWS.E2O;

/**
 * Fetches existing enquiry row data for the Edit form.
 */
export const getEnquiryEditData = (id) =>
  callWorkflow({
    workflowId: E2O.crud.getForEdit,
    data: { appId: APP_ID },
    variable: { project_id_for_Edit_offer: id },
    raw: true,
  });

/**
 * Sends updated form data to the backend update workflow.
 * Only non-empty fields are included.
 */
export const updateEnquiryData = (id, formValues) => {
  const cleanedData = removeEmptyFields({
    appId: APP_ID,
    customer:                      formValues.customer,
    projects:                      formValues.projects,
    packages:                      formValues.packages,
    scope:                         formValues.scope,
    enquiry_type:                  formValues.enquiry_type,
    offer_value:                   formValues.offer_value,
    client_enquiry_reference:      formValues.client_enquiry_reference,
    responsible_sm:                formValues.responsible_sm,
    currency:                      formValues.currency,
    offer_reference_no:            formValues.offer_reference_no,
    plant_rating:                  formValues.plant_rating,
    plant_location:                formValues.plant_location,
    enquiry_source:                formValues.enquiry_source,
    enquiry_category:              formValues.enquiry_category,
    offer_submission_planned_date: formValues.offer_submission_planned_date,
    actual_offer_date:             formValues.actual_offer_date,
    conversion_rate:               formValues.conversion_rate,
    ahpl_offer_status:             formValues.ahpl_offer_status,
    customer_enquiry_status:       formValues.customer_enquiry_status,
    backlog_hot:                   formValues.backlog_hot,
    remark:                        formValues.remark,
    client_enq_receipt_date:       formValues.client_enq_receipt_date,
  });

  return callWorkflow({
    workflowId: E2O.crud.update,
    data: cleanedData,
    variable: { project_id_for_Edit_offer: id },
    raw: true,
  });
};
