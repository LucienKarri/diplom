import axios from "axios";

export const BASE_URL = "http://localhost:8888";

export const apiService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {},
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

apiService.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        const token = localStorage.getItem("refresh_token");
        const response = await axios.post(
          `${BASE_URL}/refresh`,
          {
            refreshToken: token,
          },
          { withCredentials: true }
        );

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        return apiService.request(originalRequest);
      } catch (error) {
        console.error("refresh error > ", error);
      }
    }

    throw error;
  }
);
