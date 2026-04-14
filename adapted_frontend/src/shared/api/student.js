import api from "./client";

export async function getMyGroups() {
  const response = await api.get("/student/my-groups");
  return response.data;
}

export async function getMyLessons() {
  const response = await api.get("/student/my-lessons");
  return response.data;
}

export async function getMyProgress() {
  const response = await api.get("/student/my-progress");
  return response.data;
}