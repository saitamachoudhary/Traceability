import { BEARER_TOKEN } from '../config';

const BASE_URL = "https://apphub.andritz.com/appsapi/appbuilder/workflow";

export const apiClient = async ({ workflowId, date_from, date_to }) => {
  const payload = JSON.stringify({
    "data": {},
    "workflowId": workflowId,
    "variable": {
      date_from: date_from || "",
      date_to: date_to || ""
    }
  });
  try {
    const formData = new FormData();

    formData.append("data", payload);

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result?.data?.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};

// Used by Filter APIs — accepts any variable shape (customer, projects, packages, etc.)
export const apiClientWithVariable = async ({ workflowId, variable }) => {
  const payload = JSON.stringify({
    "data": {},
    "workflowId": workflowId,
    "variable": variable || {}
  });
  try {
    const formData = new FormData();
    formData.append("data", payload);

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      body: formData
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    return result?.data?.data;
  } catch (error) {
    console.error("Filter API Request Failed:", error);
    throw error;
  }
};

