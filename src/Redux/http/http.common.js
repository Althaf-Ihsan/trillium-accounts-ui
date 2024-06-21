import axios from "axios";
import environment from "../../environments/environment";

const { baseUrl } = environment;

const httpCommon = axios.create({
  headers: {
    "application-id": 2,
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token dynamically
httpCommon.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpCommon;