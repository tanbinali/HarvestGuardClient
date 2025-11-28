import axios from "axios";
import useAuthStore from "../stores/authStore";
import useOfflineStore from "../stores/offlineStore";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://07878d67-3f2c-4ae2-a04f-812016edb06d-00-3fcfdz3jchfvo.pike.replit.dev/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setTokens, logout } = useAuthStore.getState();

        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/auth/jwt/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const newAccessToken = response.data.access;
          setTokens(newAccessToken, refreshToken);

          originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post("/auth/users/", userData),
  login: (credentials) => api.post("/auth/jwt/create/", credentials),
  refreshToken: (refresh) => api.post("/auth/jwt/refresh/", { refresh }),
  getProfile: () => api.get("/auth/users/me/"),
  updateProfile: (data) => api.patch("/auth/users/me/", data),
};

export const cropsAPI = {
  getAll: () => api.get("/crops/batches/"),
  getActive: () => api.get("/crops/batches/active/"),
  getCompleted: () => api.get("/crops/batches/completed/"),
  getById: (id) => api.get(`/crops/batches/${id}/`),
  create: (data) => api.post("/crops/batches/", data),
  update: (id, data) => api.patch(`/crops/batches/${id}/`, data),
  delete: (id) => api.delete(`/crops/batches/${id}/`),
  getDashboard: () => api.get("/crops/batches/dashboard/"),
  exportData: (format = "json") =>
    api.get(`/crops/batches/export_data/?format=${format}`),
};

export const lossEventsAPI = {
  getAll: () => api.get("/loss-events/"),
  getById: (id) => api.get(`/loss-events/${id}/`),
  create: (data) => api.post("/loss-events/", data),
  update: (id, data) => api.patch(`/loss-events/${id}/`, data),
  delete: (id) => api.delete(`/loss-events/${id}/`),
};

export const interventionsAPI = {
  getAll: () => api.get("/interventions/"),
  getById: (id) => api.get(`/interventions/${id}/`),
  create: (data) => api.post("/interventions/", data),
  update: (id, data) => api.patch(`/interventions/${id}/`, data),
  delete: (id) => api.delete(`/interventions/${id}/`),
};

export const achievementsAPI = {
  getAll: () => api.get("/achievements/"),
};

export default api;
