import { apiClient } from "./client";

export interface StudentMyGroupItem {
  group_id: number;
  group_name: string;
  course_id: number;
  course_title: string;
  teacher_id: number | null;
  enrollment_status: string;
}

export interface StudentMyLessonItem {
  lesson_id: number;
  lesson_title: string;
  lesson_content: string | null;
  module_id: number;
  module_title: string;
  course_id: number;
  course_title: string;
  lesson_type: string;
  order_index: number;
}

export interface StudentMyProgressItem {
  lesson_id: number;
  lesson_title: string;
  status: string | null;
  score: number | null;
}

export interface LessonProgressPayload {
  lesson_id: number;
  status: "not_started" | "in_progress" | "completed";
  score?: number | null;
}

export const studentService = {
  async getMyGroups(): Promise<StudentMyGroupItem[]> {
    const { data } = await apiClient.get<StudentMyGroupItem[]>("/student/my-groups");
    return data;
  },

  async getMyLessons(): Promise<StudentMyLessonItem[]> {
    const { data } = await apiClient.get<StudentMyLessonItem[]>("/student/my-lessons");
    return data;
  },

  async getMyProgress(): Promise<StudentMyProgressItem[]> {
    const { data } = await apiClient.get<StudentMyProgressItem[]>("/student/my-progress");
    return data;
  },

  async updateLessonProgress(payload: LessonProgressPayload): Promise<void> {
    await apiClient.post("/lesson-progress/", payload);
  },
};
