import { getToken } from './auth';
import { ENDPOINTS, APP_ID } from '../constants/api';
import { WORKFLOWS } from '../constants/workflows';

export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      lum_media_reference_id: "app-elememt-id",
      lum_media_reference_type: "app_builder",
      permission: "public",
      lum_media_access_type: "file",
      mediatype: "file",
      lum_media_access_type_id: 1,
      permissionid: 1,
      lum_media_reference_type_id: 5,
    })
  );

  formData.append("file", file);

  if (onProgress) {
    // Simulated progress since fetch doesn't support upload progress events natively.
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 90) onProgress(progress);
    }, 100);
    file._progressInterval = interval;
  }

  try {
    const response = await fetch(ENDPOINTS.uploadMedia, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    });

    if (file._progressInterval) clearInterval(file._progressInterval);
    if (onProgress) onProgress(100);

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const result = await response.json();
    return result?.data;
  } catch (error) {
    if (file._progressInterval) clearInterval(file._progressInterval);
    throw error;
  }
};

// Shared submit helper for bulk-upload save calls.
const submitBulkSave = async (workflowId, filePath) => {
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      data: { appId: APP_ID, filePath, skip: 0 },
      workflowId,
    })
  );

  const response = await fetch(ENDPOINTS.workflow, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });

  return await response.json();
};

export const saveUploadedData    = (filePath) => submitBulkSave(WORKFLOWS.E2O.bulk.saveUpload, filePath);
export const saveO2SUploadedData = (filePath) => submitBulkSave(WORKFLOWS.O2S.bulk.saveUpload, filePath);
