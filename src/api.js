import axios from "axios";
import { setAccessToken, setRefreshToken, resetTokens } from "./store/authSlice";
import {store} from "./store/store"
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    console.log(accessToken)
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.info(error)
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = store.getState().auth.refreshToken;

      if (refreshToken) {
        originalRequest._retry = true;

        try {
          // Make a request to your token refresh endpoint to get new access token
          const response = await axios.post("/api/refresh-token", {
            refresh_token: refreshToken,
          });

          const newAccessToken = response.data.access_token;
          store.dispatch(setAccessToken(newAccessToken));

          // Retry the original request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (error) {
          store.dispatch(resetTokens());
          // Redirect the user to the login page or handle the token refresh error
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
