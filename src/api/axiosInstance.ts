import axios from "axios";
import { Cookies } from "react-cookie";

const axiosInstance = axios.create({
  baseURL: "https://tick-minder.ru/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export { axiosInstance };
