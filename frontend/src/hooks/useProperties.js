import { useQuery } from '@tanstack/react-query';
import { getProperties, getProperty } from '../api/properties';

export const useProperties = (params = {}) => {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => getProperties(params),
    select: (data) => data.results || data,
  });
};

export const useProperty = (id) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id),
    enabled: !!id,
  });
};
