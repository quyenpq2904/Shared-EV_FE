import http from "../../lib/utils/http";
import { ILoginRequest, IRefreshTokenRequest } from "./auth-req.type";
import { ILoginResponse, IRefreshTokenResponse } from "./auth-res.type";

const BaseURL = "auth";

const authApi = {
  login(data: ILoginRequest) {
    return http.post<ILoginResponse>(`v1/${BaseURL}/login`, data);
  },

  refreshToken(data: IRefreshTokenRequest) {
    return http.post<IRefreshTokenResponse>(`v1/${BaseURL}/refresh`, data);
  },
};

export default authApi;
