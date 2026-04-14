import { apiClient } from "./client";

export interface ApplicationCreateDto {
  name: string;
  company: string;
  email: string;
  team_size: number;
  notes?: string;
}

export interface ApplicationResponse {
  id: number;
  name: string;
  company: string;
  email: string;
  team_size: number;
  notes: string | null;
  created_at: string;
}

export const applicationsService = {
  async createApplication(payload: ApplicationCreateDto): Promise<ApplicationResponse> {
    const { data } = await apiClient.post<ApplicationResponse>("/applications/apply", payload);
    return data;
  },
};
