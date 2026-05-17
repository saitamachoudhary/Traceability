import { getToken, clearToken } from './auth';
import { ENDPOINTS } from '../constants/api';

// ─── 401 handler ──────────────────────────────────────────────────────────────
// Clears token + forces redirect to /login on 401. Skips redirect if we're
// already on /login (prevents reload loop when UserProvider fires fetchUserProfile
// with no token on the login screen).
const handleUnauthorized = (response) => {
  if (response.status === 401) {
    clearToken();
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    return true;
  }
  return false;
};

// ─── Unified workflow caller ──────────────────────────────────────────────────
// One function for every workflow request. Backend expects a multipart form
// with a single `data` field containing `{ data, workflowId, variable }`.
//
// Note: do NOT set Content-Type explicitly — the browser must add the
// multipart boundary itself for FormData payloads.
export const callWorkflow = async ({
  workflowId,
  data = {},
  variable = {},
  raw = false, // when true, returns the full JSON envelope; default unwraps to data.data
}) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify({ data, workflowId, variable }));

  const response = await fetch(ENDPOINTS.workflow, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });

  if (handleUnauthorized(response)) return;
  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const result = await response.json();
  return raw ? result : result?.data?.data;
};

// ─── Backward-compatible wrappers ─────────────────────────────────────────────
// Kept so existing service files keep working while we migrate. Once every
// caller uses `callWorkflow` directly, these can be deleted.

// Was: apiClient({ workflowId, date_from, date_to }) → data.data
export const apiClient = ({ workflowId, date_from, date_to }) =>
  callWorkflow({
    workflowId,
    variable: { date_from: date_from || "", date_to: date_to || "" },
  });

// Was: apiClientWithVariable({ workflowId, variable }) → data.data
export const apiClientWithVariable = ({ workflowId, variable }) =>
  callWorkflow({ workflowId, variable: variable || {} });

// Was: callWorkflowAPI(payload) → raw envelope
// Used by services that need the `{ status, data: { data: {...} } }` shape.
export const callWorkflowAPI = (payload) =>
  callWorkflow({
    workflowId: payload.workflowId,
    data: payload.data || {},
    variable: payload.variable || {},
    raw: true,
  });

// ─── User profile ─────────────────────────────────────────────────────────────
// Short-circuits when no token is present so we don't fire a request that
// would 401 (and trigger an unwanted redirect) on the login screen.
export const fetchUserProfile = async () => {
  const token = getToken();
  if (!token) return null;

  const response = await fetch(ENDPOINTS.userProfile, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (handleUnauthorized(response)) return null;
  if (!response.ok) throw new Error(`User profile fetch failed: ${response.status}`);
  return await response.json();
};

// ─── Login ────────────────────────────────────────────────────────────────────
import { APP_ID } from '../constants/api';
import { WORKFLOWS } from '../constants/workflows';

export const loginUser = async (email, password) => {
  const payload = {
    data: {
      appId: APP_ID,
      email,
      password,
      appName: "traceability-application",
      tenantName: "andritz",
    },
    workflowId: WORKFLOWS.AUTH.login,
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));

  try {
    const response = await fetch(ENDPOINTS.publicWorkflow, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Login API Request Failed:", error);
    throw error;
  }
};

export const initApp = async () => {
  try {
    const response = await fetch(ENDPOINTS.appInit, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log("App init:", data);
  } catch (error) {
    console.error("App init failed:", error);
  }
};
