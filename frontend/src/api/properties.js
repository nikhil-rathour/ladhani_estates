import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProperties = async (params = {}) => {
  const response = await api.get('/properties/', { params });
  return response.data;
};

export const getProperty = async (id) => {
  const response = await api.get(`/properties/${id}/`);
  return response.data;
};

export const getAmenities = async () => {
  const response = await api.get('/amenities/');
  return response.data;
};

export default api;
