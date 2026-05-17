import { getToken } from './auth';
import { ENDPOINTS } from '../constants/api';

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xlsx', 'xls'];

export const uploadMediaFile = async (file) => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error('UNSUPPORTED_FILE_TYPE');
  }

  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      lum_media_reference_id: "app-elememt-id",
      lum_media_reference_type: "app_builder",
      permission: "Public",
      lum_media_access_type: "file",
      mediatype: "file",
      lum_media_access_type_id: 1,
      permissionid: 1,
      lum_media_reference_type_id: 5,
    })
  );
  formData.append("file", file);

  const response = await fetch(ENDPOINTS.uploadMedia, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload API error: ${response.status}`);
  return await response.json();
};
