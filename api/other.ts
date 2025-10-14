import axios from 'axios';

const BASE_URL = 'https://apiserver.ecell.in/app25';

export const getFaq = async () => {
  const response = await axios.get(`${BASE_URL}/faq/`);
  return response.data;
};

export const getContact = async () => {
  const response = await axios.get(`${BASE_URL}/contact/`);
  return response.data;
};

export const getSchedule = async () => {
  const response = await axios.get(`${BASE_URL}/schedule/`);
  return response.data;
};

export const deleteProfile = async (email: string) => {
  const response = await axios.post(`${BASE_URL}/delete-profile/`, { email });
  return response.data;
};

export const getVenues = async () => {
  const response = await axios.get(`${BASE_URL}/venue/`);
  return response.data;
};
