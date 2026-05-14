import { getToken, clearToken } from './auth';

const BASE_URL = "https://apphub.andritz.com/appsapi/appbuilder/workflow";
const BASE_URL_Login = "https://apphub.andritz.com/appsapi/appbuilder/public/workflow";

// ─── Helper ───────────────────────────────────────────────────────────────────
// Checks for 401 Unauthorized — clears token and forces redirect to /login.
const handleUnauthorized = (response) => {
  if (response.status === 401) {
    clearToken();
    window.location.href = '/login';
    return true;
  }
  return false;
};

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
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    });

    if (handleUnauthorized(response)) return;

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
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    });

    if (handleUnauthorized(response)) return;

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    return result?.data?.data;
  } catch (error) {
    console.error("Filter API Request Failed:", error);
    throw error;
  }
};

export const callWorkflowAPI = async (payload) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  });

  if (handleUnauthorized(response)) return;

  return await response.json();
};

export const loginUser = async (email, password) => {
  const payload = {
    data: {
      appId: "af853ae1-c513-11f0-8899-af2975f8a698",
      email: email,
      password: password,
      appName: "traceability-application",
      tenantName: "andritz"
    },
    workflowId: "dadaff59-f660-4933-96d2-279d89ddec70"
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));

  try {
    const response = await fetch(BASE_URL_Login, {
      method: "POST",
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error("Login API Request Failed:", error);
    throw error;
  }
};
