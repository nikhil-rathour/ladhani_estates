const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const normalizeApiBaseUrl = (value) => {
  if (typeof value !== 'string') {
    return '/api';
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return '/api';
  }

  return trimmedValue.replace(/\/+$/, '');
};

export const API_BASE_URL = normalizeApiBaseUrl(rawApiBaseUrl);

if (import.meta.env.DEV && !rawApiBaseUrl) {
  console.warn('VITE_API_BASE_URL is not set. Falling back to /api.');
}
