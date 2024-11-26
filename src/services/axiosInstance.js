import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${"http://localhost:3030"}${"/api/v1"}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding `x-tenant-id` dynamically for each request
axiosInstance.interceptors.request.use((config) => {
  config.headers["x-tenant-id"] = "b_1"; // Set dynamically if needed
  return config;
});

export default axiosInstance;
