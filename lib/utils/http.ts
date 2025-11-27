import axios, {
  AxiosError,
  AxiosInstance,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getTokenFromLS,
  removeTokenFromLS,
  setTokenToLS,
} from "./localStorage";
import authApi from "@/apis/auth/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class Http {
  instance: AxiosInstance;

  private refreshPromise: Promise<string | null> | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const tokens = getTokenFromLS();
          if (tokens && tokens.accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          originalRequest &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/auth/refresh")
        ) {
          originalRequest._retry = true;

          if (!this.refreshPromise) {
            this.refreshPromise = this.performRefreshToken();
          }

          const newToken = await this.refreshPromise;

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.instance(originalRequest);
          }

          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  private async performRefreshToken(): Promise<string | null> {
    try {
      if (typeof window === "undefined") return null;

      const currentTokens = getTokenFromLS();
      if (!currentTokens || !currentTokens.refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await authApi.refreshToken({
        refreshToken: currentTokens.refreshToken,
      });

      const { accessToken, refreshToken } = response.data;

      setTokenToLS({
        accessToken,
        refreshToken,
      });

      return accessToken;
    } catch (error) {
      console.error("Auto refresh token failed:", error);

      removeTokenFromLS();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }

      return null;
    } finally {
      this.refreshPromise = null;
    }
  }
}

const http = new Http().instance;

export default http;
