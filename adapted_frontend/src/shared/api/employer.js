import api from "./client";

export async function getEmployerSummary() {
  const response = await api.get("/employer/summary");
  return response.data;
}

export async function getEmployerStudentsProgress() {
  const response = await api.get("/employer/students/progress");
  return response.data;
}