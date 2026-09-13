import axios from "axios";
import type {
     AxiosError,
     AxiosInstance,
     InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
     baseURL: "/api",
     timeout: 30000,
     withCredentials: true,
});

const refreshEndpointApi: AxiosInstance = axios.create({
     baseURL: "/api",
     withCredentials: true,
});

interface FailedQueueResponse {
     resolve: () => void;
     reject: (error: unknown) => void;
}

interface RetryableAxiosConfig extends InternalAxiosRequestConfig {
     _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: FailedQueueResponse[] = [];

const processQueue = (error: unknown) => {
     failedQueue.forEach((promise) => {
          if (error) {
               promise.reject(error);
          } else {
               promise.resolve();
          }
     });

     failedQueue = [];
};

api.interceptors.response.use(
     (response) => response,

     async (error: AxiosError) => {
          const originalRequest = error.config as
               | RetryableAxiosConfig
               | undefined;

          if (
               error.response?.status !== 401 ||
               !originalRequest ||
               originalRequest._retry
          ) {
               return Promise.reject(error);
          }

          if (isRefreshing) {
               return new Promise<void>((resolve, reject) => {
                    failedQueue.push({
                         resolve,
                         reject,
                    });
               }).then(() => api(originalRequest));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
               await refreshEndpointApi.post("/auth/refresh-token");

               processQueue(null);

               return api(originalRequest);
          } catch (refreshError) {
               processQueue(refreshError);

               if (window.location.pathname !== "/login") {
                    window.location.replace("/login");
               }

               return Promise.reject(refreshError);
          } finally {
               isRefreshing = false;
          }
     },
);

export default api;
