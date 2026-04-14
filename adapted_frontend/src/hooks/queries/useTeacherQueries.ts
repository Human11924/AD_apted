import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/queryClient";
import { teacherService } from "@/services/api/teacherService";

export const useTeacherGroups = () =>
  useQuery({
    queryKey: ["teacher", "groups"],
    queryFn: teacherService.getMyGroups,
  });

export const useTeacherCourses = () =>
  useQuery({
    queryKey: ["teacher", "courses"],
    queryFn: teacherService.getMyCourses,
  });

export const useTeacherGroupProgress = (groupId?: number) =>
  useQuery({
    queryKey: ["teacher", "group-progress", groupId],
    queryFn: () => teacherService.getGroupProgress(groupId as number),
    enabled: Boolean(groupId),
  });

export const useCreateTeacherCourse = () =>
  useMutation({
    mutationFn: teacherService.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher", "courses"] });
    },
  });
