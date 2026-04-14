import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "@/services/api/dashboardService";

export const useEmployerMetrics = () =>
  useQuery({
    queryKey: ["employer", "metrics"],
    queryFn: dashboardService.getEmployerMetrics,
  });

export const useEmployerStudents = () =>
  useQuery({
    queryKey: ["employer", "students"],
    queryFn: dashboardService.getEmployerStudents,
  });

export const useEmployerGroups = () =>
  useQuery({
    queryKey: ["employer", "groups"],
    queryFn: dashboardService.getEmployerGroups,
  });

export const useAccessCodes = () =>
  useQuery({
    queryKey: ["employer", "access-codes"],
    queryFn: dashboardService.getAccessCodes,
  });
