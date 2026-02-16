import api from './client';

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
