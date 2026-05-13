import { BEARER_TOKEN } from '../config';

const UPLOAD_URL = "https://apphub.andritz.com/appsapi/appbuilder/add-media";
const WORKFLOW_URL = "https://apphub.andritz.com/appsapi/appbuilder/workflow";

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
      lum_media_reference_type_id: 5
    })
  );

  formData.append("file", file);

  if (onProgress) {
    // Simulated progress since fetch doesn't support upload progress events natively
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 90) {
        onProgress(progress);
      }
    }, 100);

    // Save interval ID to clear it when fetch completes
    file._progressInterval = interval;
  }

  try {
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      body: formData
    });

    if (file._progressInterval) {
      clearInterval(file._progressInterval);
    }
    
    if (onProgress) onProgress(100);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result?.data;
  } catch (error) {
    if (file._progressInterval) {
      clearInterval(file._progressInterval);
    }
    throw error;
  }
};

export const saveUploadedData = async (filePath) => {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      data: {
        appId: "af853ae1-c513-11f0-8899-af2975f8a698",
        filePath: filePath,
        skip: 0
      },
      workflowId: "9a96c36a-cea6-11f0-8899-a1080db368b6"
    })
  );

  const response = await fetch(WORKFLOW_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    body: formData
  });

  return await response.json();
};

export const saveO2SUploadedData = async (filePath) => {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      data: {
        appId: "af853ae1-c513-11f0-8899-af2975f8a698",
        filePath: filePath,
        skip: 0
      },
      workflowId: "580eae5e-d4c8-11f0-911f-5f25d94b6664"
    })
  );

  const response = await fetch(WORKFLOW_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    body: formData
  });

  return await response.json();
};
