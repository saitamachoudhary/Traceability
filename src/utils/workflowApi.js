import { apiClient } from './apiClient';

export const callWorkflow = ({ workflowId, date_from, date_to }) => {
  return apiClient({ workflowId, date_from, date_to });
};
