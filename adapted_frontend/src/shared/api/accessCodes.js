import api from "./client";

export async function getMyAccessCodes() {
  const response = await api.get("/access-codes/me");
  return response.data;
}

export async function createAccessCode(payload) {
  const response = await api.post("/access-codes/", payload);
  return response.data;
}

export async function deactivateAccessCode(id) {
  const response = await api.patch(`/access-codes/${id}/deactivate`);
  return response.data;
}