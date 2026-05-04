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
    // formData.append("data", JSON.stringify({}));
    // formData.append("workflowId", workflowId);
    // formData.append(
    //   "variable",
    //   JSON.stringify({
    //     date_from: date_from || "",
    //     date_to: date_to || ""
    //   })
    // );

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
