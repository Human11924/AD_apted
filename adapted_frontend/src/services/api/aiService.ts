import { apiClient } from "./client";

export interface AIProfile {
  student_id: number;
  department: string;
  ai_level: string;
  known_words_count: number;
  onboarding_completed: boolean;
  onboarding_version: number;
}

export interface AIProfileStatus {
  has_ai_profile: boolean;
  onboarding_completed: boolean;
  profile: AIProfile | null;
}

export interface AIOnboardingOptions {
  departments: Array<{ code: string; label: string }>;
  word_bank: Record<string, string[]>;
  version: number;
}

export interface AIQuizQuestion {
  question: string;
  options: string[];
  correct_answer_index: number;
  explanation: string;
}

export interface AIQuizResult {
  topic: string;
  department: string;
  ai_level: string;
  questions: AIQuizQuestion[];
}

export interface PronunciationScores {
  accuracy_score: number | null;
  fluency_score: number | null;
  completeness_score: number | null;
  pronunciation_score: number | null;
}

export interface PronunciationSession {
  greeting: string;
  instruction: string;
  reference_text: string;
  intro_audio_base64: string | null;
  reference_audio_base64: string;
}

export interface PronunciationAssessment {
  reference_text: string;
  recognized_text: string | null;
  success: boolean;
  scores: PronunciationScores;
  feedback_text: string | null;
  feedback_audio_base64: string | null;
  error_message: string | null;
}

export const aiService = {
  async getProfileStatus(): Promise<AIProfileStatus> {
    const { data } = await apiClient.get<AIProfileStatus>("/ai/profile/me");
    return data;
  },

  async getOnboardingOptions(): Promise<AIOnboardingOptions> {
    const { data } = await apiClient.get<AIOnboardingOptions>("/ai/profile/onboarding/options");
    return data;
  },

  async completeOnboarding(payload: { department: string; known_words: string[] }): Promise<AIProfile> {
    const { data } = await apiClient.post<AIProfile>("/ai/profile/onboarding", payload);
    return data;
  },

  async generateQuiz(payload: { topic: string; question_count: number; course_id?: number; lesson_id?: number }): Promise<AIQuizResult> {
    const { data } = await apiClient.post<AIQuizResult>("/ai/quiz/generate", payload);
    return data;
  },

  async startPronunciationSession(): Promise<PronunciationSession> {
    const { data } = await apiClient.post<PronunciationSession>("/ai/pronunciation/session", {});
    return data;
  },

  async assessPronunciation(payload: { reference_text: string; audio_base64: string; language?: string }): Promise<PronunciationAssessment> {
    const { data } = await apiClient.post<PronunciationAssessment>("/ai/pronunciation/assess", payload, {
      timeout: 60_000,
    });
    return data;
  },
};
