import { callWorkflowAPI } from "../utils/workflowApi";

const WORKFLOW_ID = "6073fef8-446b-11f1-8e18-73bae3646b63";

export const fetchEnquiryTable = (filters) => {
  return callWorkflowAPI(WORKFLOW_ID, filters);
};
