import { apiClient } from "./client";

export interface TeacherGroupItem {
  group_id: number;
  group_name: string;
  course_id: number;
  course_title: string;
  company_id: number;
  start_date: string | null;
  end_date: string | null;
  max_students: number | null;
  format: string;
  students_count: number;
}

export interface TeacherAssignedCourseItem {
  course_id: number;
  title: string;
  description: string | null;
  level: string;
  duration_weeks: number;
  is_published: boolean;
}

interface TeacherMyCourseResponse {
  id: number;
  title: string;
  description: string | null;
  level: string;
  duration_weeks: number;
  created_by_teacher_id: number;
  is_published: boolean;
}

export interface TeacherCreateCourseDto {
  title: string;
  description?: string;
  level: string;
  duration_weeks: number;
  is_published: boolean;
}

export interface TeacherGroupProgressItem {
  student_id: number;
  full_name: string;
  lessons_completed: number;
  total_lessons: number;
  progress_percent: number;
}

export const teacherService = {
  async getMyGroups(): Promise<TeacherGroupItem[]> {
    const { data } = await apiClient.get<TeacherGroupItem[]>("/teacher/my-groups");
    return data;
  },

  async getMyCourses(): Promise<TeacherAssignedCourseItem[]> {
    const { data } = await apiClient.get<TeacherMyCourseResponse[]>("/courses/my");
    return data.map((course) => ({
      course_id: course.id,
      title: course.title,
      description: course.description,
      level: course.level,
      duration_weeks: course.duration_weeks,
      is_published: course.is_published,
    }));
  },

  async getGroupProgress(groupId: number): Promise<TeacherGroupProgressItem[]> {
    const { data } = await apiClient.get<TeacherGroupProgressItem[]>(`/teacher/groups/${groupId}/progress`);
    return data;
  },

  async createCourse(payload: TeacherCreateCourseDto): Promise<TeacherAssignedCourseItem> {
    const { data } = await apiClient.post<TeacherMyCourseResponse>("/courses/", payload);
    return {
      course_id: data.id,
      title: data.title,
      description: data.description,
      level: data.level,
      duration_weeks: data.duration_weeks,
      is_published: data.is_published,
    };
  },
};
