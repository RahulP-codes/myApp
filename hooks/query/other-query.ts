import { useQuery } from '@tanstack/react-query';
import { getFaq, getContact, getSchedule, getVenues } from '../../api/other';

export const useFaq = () => {
  return useQuery({
    queryKey: ['faq'],
    queryFn: getFaq,
  });
};

export const useContact = () => {
  return useQuery({
    queryKey: ['contact'],
    queryFn: getContact,
  });
};

export const useSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: getSchedule,
  });
};

export const useVenues = () => {
  return useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });
};
