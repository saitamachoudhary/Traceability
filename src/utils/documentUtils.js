import { ENDPOINTS } from '../constants/api';

/**
 * Converts a relative document path from the API into a full URL.
 * Example: "/public/file/abc.png" → "https://apphub.andritz.com/public/file/abc.png"
 *
 * @param {string} path - The relative document path from the table row.
 * @returns {string} Full document URL or empty string if path is falsy.
 */
export const getDocumentUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ENDPOINTS.iframeOrigin}${path}`;
};

/**
 * Detects the file extension from a URL or file path.
 * @param {string} url
 * @returns {string} lowercase extension without dot, e.g. "pdf", "png"
 */
export const getFileExtension = (url) => {
  if (!url) return "";
  // Strip query strings and fragments before extracting extension
  const cleanUrl = url.split("?")[0].split("#")[0];
  return cleanUrl.split(".").pop().toLowerCase();
};

/**
 * Returns the file category for rendering decisions.
 * @param {string} url
 * @returns {"image"|"pdf"|"unsupported"|"unknown"}
 */
export const getFileCategory = (url) => {
  const ext = getFileExtension(url);
  const images = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"];
  const pdfs = ["pdf"];
  const unsupported = ["xlsx", "xls", "doc", "docx", "csv", "txt", "ppt", "pptx"];

  if (images.includes(ext)) return "image";
  if (pdfs.includes(ext)) return "pdf";
  if (unsupported.includes(ext)) return "unsupported";
  return "unknown";
};
