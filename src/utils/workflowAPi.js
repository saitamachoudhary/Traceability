// DEPRECATED — kept as a thin compatibility shim for backward imports.
// Prefer `callWorkflow` from './apiClient' for all new code.
import { callWorkflow as unifiedCallWorkflow } from './apiClient';

// Was: callWorkflow({ workflowId, date_from, date_to }) → unwrapped data.data
export const callWorkflow = ({ workflowId, date_from, date_to }) =>
  unifiedCallWorkflow({
    workflowId,
    variable: { date_from: date_from || "", date_to: date_to || "" },
  });

// Was: callWorkflowAPI(workflowId, variables = {}) → unwrapped data.data
// Positional signature kept for legacy callers.
export const callWorkflowAPI = (workflowId, variables = {}) =>
  unifiedCallWorkflow({ workflowId, variable: variables });
