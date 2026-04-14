import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/queryClient";
import { aiService } from "@/services/api/aiService";

export const useAIProfileStatus = () =>
  useQuery({
    queryKey: ["ai", "profile", "status"],
    queryFn: aiService.getProfileStatus,
  });

export const useAIOnboardingOptions = () =>
  useQuery({
    queryKey: ["ai", "onboarding", "options"],
    queryFn: aiService.getOnboardingOptions,
  });

export const useCompleteAIOnboarding = () =>
  useMutation({
    mutationFn: aiService.completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai", "profile", "status"] });
    },
  });

export const useGenerateAIQuiz = () =>
  useMutation({
    mutationFn: aiService.generateQuiz,
  });

export const usePronunciationSession = () =>
  useQuery({
    queryKey: ["ai", "pronunciation", "session"],
    queryFn: aiService.startPronunciationSession,
  });

export const useAssessPronunciation = () =>
  useMutation({
    mutationFn: aiService.assessPronunciation,
  });
