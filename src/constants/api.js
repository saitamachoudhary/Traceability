// Centralized API endpoints + AppHub identifiers.
// Update here in one place when backend/host changes.

export const APP_ID        = "af853ae1-c513-11f0-8899-af2975f8a698";
export const CONNECTION_ID = "af995f25-c513-11f0-8899-bb17b82660ad";

const HOST = "https://apphub.andritz.com";

export const ENDPOINTS = {
  workflow:       `${HOST}/appsapi/appbuilder/workflow`,
  publicWorkflow: `${HOST}/appsapi/appbuilder/public/workflow`,
  userProfile:    `${HOST}/appsapi/secure/user-vo`,
  refreshToken:   `${HOST}/appsapi/secure/refresh-token`,
  appInit:        `${HOST}/appsapi/appbuilder/app/init/${APP_ID}`,
  uploadMedia:    `${HOST}/appsapi/appbuilder/add-media`,
  downloadMedia:  `${HOST}/appsapi/appbuilder/downloadMedia`,
  filePreview:    `${HOST}/appsapi/ai/grid`,
  iframeOrigin:   HOST,
};
