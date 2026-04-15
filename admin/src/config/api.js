const normalizeBaseUrl = (url) => (url || "").trim().replace(/\/+$/, "");

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL);

