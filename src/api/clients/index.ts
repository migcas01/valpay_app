import axios from "axios";

// Base Axios instance for all internal API calls
export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Desactivar credenciales para evitar problemas CORS
});

// Response interceptor: unwrap .data from Axios response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error); // Debug
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);
