import { BEARER_TOKEN } from '../config';

export const downloadFile = async (payload, fileName = "enquiry_to_offer_template.xlsx") => {
  const response = await fetch(
    "https://apphub.andritz.com/appsapi/appbuilder/downloadMedia",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      body: JSON.stringify(payload)
    }
  );

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  // default file name
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
