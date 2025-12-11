import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Must end WITHOUT trailing slash
  withCredentials: true, // Important for CORS + cookies/auth
});

// Attach token automatically to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Optional: handle 401 errors globally
api.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
