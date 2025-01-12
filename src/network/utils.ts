import axios from "axios";

const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchData = async (url: string) => {
  const response = await axios.get(`${VITE_API_URL}${url}`, {
    headers: {
      apikey: VITE_API_KEY,
      Authorization: `Bearer ${VITE_API_TOKEN}`,
    },
  });
  return response.data;
};
