import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const EXCLUDED_FROM_SESSION_EXPIRY = ["/auth/login", "/auth/me", "/auth/logout"];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || "";
    const isExcluded = EXCLUDED_FROM_SESSION_EXPIRY.some((path) => url.includes(path));

    if (status === 401 && !isExcluded) {
      window.dispatchEvent(new CustomEvent("auth:session-expired"));
    }

    return Promise.reject(error);
  }
);

export default api;
