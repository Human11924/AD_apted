import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/queryClient";
import { studentService } from "@/services/api/studentService";

export const useStudentGroups = () =>
  useQuery({
    queryKey: ["student", "groups"],
    queryFn: studentService.getMyGroups,
  });

export const useStudentLessons = () =>
  useQuery({
    queryKey: ["student", "lessons"],
    queryFn: studentService.getMyLessons,
  });

export const useStudentProgress = () =>
  useQuery({
    queryKey: ["student", "progress"],
    queryFn: studentService.getMyProgress,
  });

export const useUpdateStudentLessonProgress = () =>
  useMutation({
    mutationFn: studentService.updateLessonProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "progress"] });
      queryClient.invalidateQueries({ queryKey: ["student", "lessons"] });
    },
  });
