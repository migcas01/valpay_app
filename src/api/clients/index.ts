import axios from "axios";

// Base Axios instance for all internal API calls
export const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor: unwrap .data from Axios response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);
