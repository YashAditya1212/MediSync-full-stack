const normalizeBaseUrl = (url) => (url || "").trim().replace(/\/+$/, "");

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL);
export const GODSEYE_API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_GODSEYE_API
);

export const buildApiUrl = (baseUrl, path = "") => {
  if (!baseUrl) {
    return path;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};

