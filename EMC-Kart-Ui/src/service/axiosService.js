import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const makeAuthenticatedRequest = (url, method, data = null) => {
  const token = localStorage.getItem("token");

  return axios({
    url: `${API_URL}${url}`,
    method,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
