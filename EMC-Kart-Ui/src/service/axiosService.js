import axios from "axios";

export const makeAuthenticatedRequest = (url, method, data) => {
  const token = localStorage.getItem("token");

  return axios({
    url: import.meta.env.VITE_LOCAL_URL + url,
    method,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
