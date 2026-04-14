import api from "./client";

export async function loginBusiness(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export async function registerByAccessCode(payload) {
  const response = await api.post("/auth/register-by-code", payload);
  return response.data;
}

export async function getMe() {
  const response = await api.get("/auth/me");
  return response.data;
}