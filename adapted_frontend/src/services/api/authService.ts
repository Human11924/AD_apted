import type { LoginDto, RegisterByCodeDto, TokenResponse, User } from "@/types/auth";

import { apiClient } from "./client";

interface AuthWithUserResponse extends TokenResponse {
  user: User;
}

async function getMe(accessToken?: string): Promise<User> {
  const { data } = await apiClient.get<User>("/auth/me", {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  return data;
}

export const authService = {
  async login(payload: LoginDto): Promise<AuthWithUserResponse> {
    const { data } = await apiClient.post<TokenResponse>("/auth/login", payload);
    const user = await getMe(data.access_token);
    return { ...data, user };
  },

  async registerByCode(payload: RegisterByCodeDto): Promise<AuthWithUserResponse> {
    const { data } = await apiClient.post<TokenResponse>("/auth/register-by-code", payload);
    const user = await getMe(data.access_token);
    return { ...data, user };
  },

  async getMe(accessToken?: string): Promise<User> {
    return getMe(accessToken);
  },
};
