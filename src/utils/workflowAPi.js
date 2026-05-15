import { apiClient } from './apiClient';
import { getToken } from './auth';

export const callWorkflow = ({ workflowId, date_from, date_to }) => {
  return apiClient({ workflowId, date_from, date_to });
};

export const callWorkflowAPI = async (workflowId, variables = {}) => {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      data: {},
      workflowId,
      variable: variables
    })
  );

  const BASE_URL = "https://apphub.andritz.com/appsapi/appbuilder/workflow";

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  });

  const result = await response.json();
  return result?.data?.data;
};
