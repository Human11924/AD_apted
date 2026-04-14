import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Mic, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import {
  useAIOnboardingOptions,
  useAIProfileStatus,
  useAssessPronunciation,
  useCompleteAIOnboarding,
  useGenerateAIQuiz,
  usePronunciationSession,
} from "@/hooks/queries/useAIQueries";
import { useStudentGroups, useStudentLessons, useStudentProgress, useUpdateStudentLessonProgress } from "@/hooks/queries/useStudentQueries";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuthStore } from "@/store/authStore";

export function StudentDashboardPage() {
  const { t } = useI18n();
  const groupsQuery = useStudentGroups();
  const progressQuery = useStudentProgress();
  const completed = (progressQuery.data ?? []).filter((item) => item.status === "completed").length;
  const total = progressQuery.data?.length ?? 0;
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div>
      <PageHeader title="Student Dashboard" description="Continue lessons and track personal progress." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Current Group" subtitle={groupsQuery.data?.[0]?.group_name ?? "No group assigned yet"}>
          <ProgressBar value={percent} />
          <div className="mt-4">
            <Link to="/student/courses/1/lesson/1">
              <Button size="sm">{t("Continue Learning")}</Button>
            </Link>
          </div>
        </Card>
        <Card title="Streak" subtitle="Consistency this month">
          <p className="text-4xl font-semibold">{t("12 days")}</p>
          <p className="mt-2 text-sm adapted-muted">{t("Keep your momentum with 10-minute lesson blocks during workday breaks.")}</p>
        </Card>
      </div>
    </div>
  );
}

export function StudentCoursesPage() {
  const { t } = useI18n();
  const groupsQuery = useStudentGroups();
  const lessonsQuery = useStudentLessons();
  const progressQuery = useStudentProgress();

  const lessons = lessonsQuery.data ?? [];
  const progress = progressQuery.data ?? [];

  return (
    <div>
      <PageHeader title="My Courses" description="Role-specific modules for real workplace communication." />
      <div className="grid gap-4 md:grid-cols-2">
        {(groupsQuery.data ?? []).map((group) => {
          const courseLessons = lessons.filter((lesson) => lesson.course_id === group.course_id);
          const lessonIds = new Set(courseLessons.map((lesson) => lesson.lesson_id));
          const completed = progress.filter((item) => item.status === "completed" && lessonIds.has(item.lesson_id)).length;
          const percent = courseLessons.length > 0 ? (completed / courseLessons.length) * 100 : 0;

          return (
            <Card key={group.group_id} title={group.course_title} subtitle={group.group_name}>
              <ProgressBar value={percent} />
              <p className="mt-2 text-xs adapted-muted">
                {t("Completed lessons summary").replace("{completed}", String(completed)).replace("{total}", String(courseLessons.length))}
              </p>
            <div className="mt-4">
              <Link to={`/student/courses/${group.course_id}/lesson/1`}>
                <Button size="sm" variant="secondary">
                  {t("Open Course")}
                </Button>
              </Link>
            </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function StudentLessonPage() {
  const { t } = useI18n();
  const lessonsQuery = useStudentLessons();
  const progressQuery = useStudentProgress();
  const updateProgressMutation = useUpdateStudentLessonProgress();
  const { lessonId } = useParams();
  const parsedLessonId = Number(lessonId);
  const isLessonIdValid = Number.isFinite(parsedLessonId) && parsedLessonId > 0;

  const currentProgress = isLessonIdValid
    ? (progressQuery.data ?? []).find((item) => item.lesson_id === parsedLessonId)
    : undefined;
  const selectedLesson = isLessonIdValid
    ? (lessonsQuery.data ?? []).find((item) => item.lesson_id === parsedLessonId)
    : lessonsQuery.data?.[0];
  const isCompleted = currentProgress?.status === "completed";
  const lessonContent = selectedLesson?.lesson_content?.trim();
  const lessonSections = lessonContent ? lessonContent.split("\n").map((line) => line.trim()).filter(Boolean) : [];
  const detailHighlights = lessonSections.filter((line) => /^(goal|scenario|framework|your task|practice):/i.test(line));
  const dialogueLines = lessonSections.filter((line) => line.includes(":"));
  const quizLines = lessonSections.filter((line) => /^quiz\s*\d+:/i.test(line) || /^[ABC]\)/.test(line));
  const courseLessons = selectedLesson
    ? (lessonsQuery.data ?? [])
        .filter((item) => item.course_id === selectedLesson.course_id)
        .sort((a, b) => a.module_id - b.module_id || a.order_index - b.order_index)
    : [];

  return (
    <div>
      <PageHeader
        title={selectedLesson?.lesson_title ?? "Lesson View"}
        description={
          selectedLesson
            ? `${selectedLesson.course_title} · ${selectedLesson.module_title}`
            : "Practical scenario: welcoming guests and clarifying requests."
        }
      />
      <Card title="Lesson Content" subtitle={t("Estimated time minutes").replace("{minutes}", selectedLesson?.lesson_type === "quiz" ? "10" : selectedLesson?.lesson_type === "dialogue" ? "18" : "12")}>
        {courseLessons.length > 0 ? (
          <div className="mb-4 grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t("Course Lessons")}</p>
            <div className="grid gap-1">
              {courseLessons.map((lesson) => {
                const lessonStatus = progressQuery.data?.find((item) => item.lesson_id === lesson.lesson_id)?.status;
                const isCurrentLesson = lesson.lesson_id === selectedLesson?.lesson_id;

                return (
                  <Link
                    key={lesson.lesson_id}
                    to={`/student/courses/${lesson.course_id}/lesson/${lesson.lesson_id}`}
                    className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition ${
                      isCurrentLesson ? "bg-blue-100 text-[var(--primary)]" : "text-slate-700 hover:bg-white"
                    }`}
                  >
                    <span>{lesson.lesson_title}</span>
                    <span className="text-xs adapted-muted">{lessonStatus === "completed" ? t("Completed") : lessonStatus === "in_progress" ? t("In progress") : t("Not started")}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        {selectedLesson ? (
          <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{t("Lesson Type")}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{selectedLesson.lesson_type}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{t("Module")}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{selectedLesson.module_title}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{t("Content Lines")}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{lessonSections.length}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{t("Progress")}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {isCompleted ? t("Completed") : currentProgress?.status === "in_progress" ? t("In progress") : t("Not started")}
              </p>
            </div>
          </div>
        ) : null}

        {detailHighlights.length > 0 ? (
          <div className="mb-4 grid gap-2">
            {detailHighlights.map((line, index) => {
              const separatorIndex = line.indexOf(":");
              const label = line.slice(0, separatorIndex).trim();
              const value = line.slice(separatorIndex + 1).trim();

              return (
                <div key={index} className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-sm">
                  <p className="font-semibold text-blue-800">{label}</p>
                  <p className="mt-1 text-blue-900/80">{value}</p>
                </div>
              );
            })}
          </div>
        ) : null}

        {selectedLesson?.lesson_type === "dialogue" && dialogueLines.length > 0 ? (
          <div className="grid gap-2">
            {dialogueLines.map((line, index) => {
              const splitIndex = line.indexOf(":");
              const speaker = line.slice(0, splitIndex).trim();
              const text = line.slice(splitIndex + 1).trim();

              return (
                <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                  <p className="font-medium text-slate-800">{speaker}</p>
                  <p className="mt-1 adapted-muted">{text}</p>
                </div>
              );
            })}
          </div>
        ) : selectedLesson?.lesson_type === "quiz" && quizLines.length > 0 ? (
          <div className="grid gap-2 text-sm">
            {quizLines.map((line, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-3 adapted-muted">
                {line}
              </div>
            ))}
            <p className="text-xs adapted-muted">{t("Choose your answers and discuss them with your teacher.")}</p>
          </div>
        ) : lessonSections.length > 0 ? (
          <div className="grid gap-2 text-sm leading-relaxed">
            {lessonSections.map((section, index) => {
              const splitIndex = section.indexOf(":");
              const hasLabel = splitIndex > -1;

              if (!hasLabel) {
                return (
                  <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-3 adapted-muted">
                    {section}
                  </div>
                );
              }

              const label = section.slice(0, splitIndex).trim();
              const value = section.slice(splitIndex + 1).trim();

              return (
                <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="font-medium text-slate-800">{label}</p>
                  <p className="mt-1 adapted-muted">{value}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm leading-relaxed adapted-muted">{t("Practice key phrases and complete speaking prompts with guided feedback.")}</p>
        )}
        <div className="mt-5 flex gap-2">
          <Button
            disabled={!isLessonIdValid || isCompleted || updateProgressMutation.isPending}
            onClick={() => {
              if (!isLessonIdValid) return;

              updateProgressMutation.mutate({
                lesson_id: parsedLessonId,
                status: "completed",
              });
            }}
          >
            {isCompleted ? t("Completed") : updateProgressMutation.isPending ? t("Saving...") : t("Mark as Complete")}
          </Button>
          <Button variant="secondary">{t("Save Draft")}</Button>
        </div>
        {updateProgressMutation.isError ? <p className="mt-3 text-sm text-[var(--danger)]">{t("Could not update lesson progress.")}</p> : null}
        {updateProgressMutation.isSuccess || isCompleted ? (
          <p className="mt-3 text-sm text-emerald-700">{t("Lesson marked as completed.")}</p>
        ) : null}
      </Card>
    </div>
  );
}

export function StudentProgressPage() {
  const { t } = useI18n();
  const progressQuery = useStudentProgress();
  const completed = (progressQuery.data ?? []).filter((item) => item.status === "completed").length;
  const total = progressQuery.data?.length ?? 0;
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div>
      <PageHeader title="My Progress" description="See your growth and completion trajectory." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Completion">
          <ProgressBar value={percent} />
        </Card>
        <Card title="Speaking Confidence" subtitle="Self + teacher evaluation trend">
          <p className="text-3xl font-semibold">{t("B1 trajectory")}</p>
          <p className="mt-2 text-sm adapted-muted">{t("Steady improvement in service-focused conversation tasks.")}</p>
        </Card>
      </div>
    </div>
  );
}

export function StudentProfilePage() {
  const { t } = useI18n();
  const user = useAuthStore((state) => state.user);
  const initials =
    user?.full_name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "ST";

  return (
    <div>
      <PageHeader title="Profile" description="Your personal workspace details." />
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden p-0">
          <div className="h-28 bg-[var(--primary)]" />
          <div className="px-5 pb-5">
            <div className="-mt-10 inline-flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-2xl font-semibold text-slate-700 shadow-sm">
              {initials}
            </div>

            <div className="mt-3">
              <p className="text-xl font-semibold tracking-tight text-slate-900">{user?.full_name || t("Student")}</p>
              <p className="text-sm adapted-muted">{user?.role ? `${user.role[0].toUpperCase()}${user.role.slice(1)}` : t("Student")}</p>
            </div>

            <div className="mt-5 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="adapted-muted">{t("Email")}</span>
                <span className="font-medium text-slate-800">{user?.email || "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="adapted-muted">{t("Status")}</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {user?.is_active === false ? t("Inactive") : t("Active")}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function StudentGenerateQuizPage() {
  const { t } = useI18n();
  const [topic, setTopic] = useState("Front desk communication");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [lastScore, setLastScore] = useState<{ correct: number; total: number } | null>(null);
  const profileStatus = useAIProfileStatus();
  const onboardingOptions = useAIOnboardingOptions();
  const onboardingMutation = useCompleteAIOnboarding();
  const quizMutation = useGenerateAIQuiz();
  const user = useAuthStore((state) => state.user);

  const firstDepartment = onboardingOptions.data?.departments[0]?.code;
  const sampleWords = firstDepartment ? (onboardingOptions.data?.word_bank[firstDepartment] ?? []).slice(0, 5) : [];

  const solvedKey = `adapted-ai-quiz-history-${user?.id ?? "anon"}`;
  const solvedHistory = JSON.parse(localStorage.getItem(solvedKey) ?? "[]") as Array<{ correct: number; total: number; at: string; topic: string }>;
  const solvedQuizzes = solvedHistory.length;
  const solvedQuestions = solvedHistory.reduce((acc, item) => acc + item.total, 0);

  const submitQuizAttempt = () => {
    if (!quizMutation.data) return;

    const correct = quizMutation.data.questions.reduce((acc, question, index) => {
      return acc + (selectedAnswers[index] === question.correct_answer_index ? 1 : 0);
    }, 0);

    const score = { correct, total: quizMutation.data.questions.length };
    setLastScore(score);

    const nextHistory = [
      ...solvedHistory,
      {
        ...score,
        at: new Date().toISOString(),
        topic: quizMutation.data.topic,
      },
    ];
    localStorage.setItem(solvedKey, JSON.stringify(nextHistory));
  };

  return (
    <div>
      <PageHeader title="Generate Quiz" description="Create AI-generated MCQ quizzes by topic and track your results." />

      <Card title="Quiz Generator" subtitle="AI-generated MCQ for your workplace English topic.">
        <div className="grid gap-3">
          <Input label={t("Topic")} value={topic} onChange={(event) => setTopic(event.target.value)} />
          {!profileStatus.data?.onboarding_completed ? (
            <Button
              variant="secondary"
              disabled={!firstDepartment || onboardingMutation.isPending}
              onClick={() => {
                if (!firstDepartment) return;
                onboardingMutation.mutate({
                  department: firstDepartment,
                  known_words: sampleWords,
                });
              }}
            >
              {onboardingMutation.isPending ? t("Enabling...") : t("Enable AI Tools")}
            </Button>
          ) : null}
          <Button
            disabled={quizMutation.isPending || !profileStatus.data?.onboarding_completed}
            onClick={() => {
              setSelectedAnswers({});
              setLastScore(null);
              quizMutation.mutate({ topic, question_count: 5 });
            }}
          >
            {quizMutation.isPending ? t("Generating...") : t("Generate AI Quiz")}
          </Button>
          {!profileStatus.data?.onboarding_completed ? (
            <p className="text-sm adapted-muted">{t("Enable AI tools once to start generating quizzes.")}</p>
          ) : null}
          {onboardingMutation.error ? <p className="text-sm text-[var(--danger)]">{t("Failed to enable AI tools.")}</p> : null}
          {quizMutation.error ? <p className="text-sm text-[var(--danger)]">{t("Could not generate quiz now. Try again.")}</p> : null}
          <div className="rounded-xl bg-slate-100 p-3 text-sm">
            <p className="font-medium">{t("Solved analytics")}</p>
            <p className="adapted-muted">{t("Quizzes solved").replace("{count}", String(solvedQuizzes))}</p>
            <p className="adapted-muted">{t("Questions solved").replace("{count}", String(solvedQuestions))}</p>
          </div>
        </div>
      </Card>

      {quizMutation.data ? (
        <div className="mt-4 grid gap-3">
          {quizMutation.data.questions.map((question, index) => (
            <Card key={index} title={`Q${index + 1}. ${question.question}`} subtitle={`Topic: ${quizMutation.data?.topic}`}>
              <ul className="grid gap-2 text-sm adapted-muted">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`quiz-question-${index}`}
                        checked={selectedAnswers[index] === optionIndex}
                        onChange={() => {
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [index]: optionIndex,
                          }));
                        }}
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs adapted-muted">{t("Hint")}: {question.explanation}</p>
            </Card>
          ))}
          <div className="flex flex-wrap gap-2">
            <Button onClick={submitQuizAttempt}>{t("Submit Quiz")}</Button>
            <Button variant="secondary" leftIcon={<RotateCcw size={14} />} onClick={() => setSelectedAnswers({})}>
              {t("Reset Answers")}
            </Button>
          </div>
          {lastScore ? (
            <Card title="Last Result">
              <p className="text-sm adapted-muted">
                {t("You solved quiz summary").replace("{correct}", String(lastScore.correct)).replace("{total}", String(lastScore.total))}
              </p>
              <ProgressBar value={(lastScore.correct / lastScore.total) * 100} className="mt-3" />
            </Card>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function StudentPronunciationPracticePage() {
  const { t } = useI18n();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState<"reference" | "feedback" | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const pronunciationSession = usePronunciationSession();
  const pronunciationMutation = useAssessPronunciation();
  const pronunciationErrorMessage = getMutationErrorMessage(pronunciationMutation.error);

  const stopAudio = () => {
    if (!audioPlayerRef.current) return;
    audioPlayerRef.current.pause();
    audioPlayerRef.current.currentTime = 0;
    audioPlayerRef.current = null;
    setActiveAudio(null);
  };

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, []);

  const playBase64Audio = (base64: string | null | undefined, type: "reference" | "feedback") => {
    if (!base64) return;

    if (activeAudio === type) {
      stopAudio();
      return;
    }

    stopAudio();

    const audio = new Audio(`data:audio/wav;base64,${base64}`);
    audioPlayerRef.current = audio;
    setActiveAudio(type);

    audio.onended = () => {
      if (audioPlayerRef.current === audio) {
        audioPlayerRef.current = null;
        setActiveAudio(null);
      }
    };

    void audio.play().catch(() => {
      if (audioPlayerRef.current === audio) {
        audioPlayerRef.current = null;
        setActiveAudio(null);
      }
    });
  };

  const saveWavAsBase64 = async (blob: Blob): Promise<string> => {
    const buffer = await blob.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunk = 0x8000;

    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }

    return btoa(binary);
  };

  const startRecording = async () => {
    stopAudio();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    recorderRef.current = recorder;
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const webmBlob = new Blob(chunks, { type: "audio/webm" });
      const audioContext = new AudioContext();
      const decoded = await audioContext.decodeAudioData(await webmBlob.arrayBuffer());

      const wavBuffer = encodeWav(decoded);
      const wavBlob = new Blob([wavBuffer], { type: "audio/wav" });
      const b64 = await saveWavAsBase64(wavBlob);
      setAudioBase64(b64);

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      recorderRef.current = null;
      setIsRecording(false);
    };

    recorder.start();
    setIsRecording(true);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      if (recorderRef.current?.state === "recording") {
        recorderRef.current.stop();
      }
      return;
    }

    await startRecording();
  };

  return (
    <div>
      <PageHeader title="Pronunciation Practice" description="Speak and assess your pronunciation with backend AI speech scoring." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Practice" subtitle="Listen, record, and submit for scoring.">
          <div className="grid gap-3">
            <p className="text-sm adapted-muted">{t("Reference")}: {pronunciationSession.data?.reference_text ?? t("Loading phrase...")}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                leftIcon={<Play size={14} />}
                disabled={!pronunciationSession.data?.reference_audio_base64}
                onClick={() => playBase64Audio(pronunciationSession.data?.reference_audio_base64, "reference")}
              >
                {activeAudio === "reference" ? t("Stop Reference") : t("Play Reference")}
              </Button>
              <Button
                variant="secondary"
                leftIcon={<RotateCcw size={14} />}
                disabled={pronunciationSession.isFetching}
                onClick={async () => {
                  stopAudio();
                  setAudioBase64(null);
                  pronunciationMutation.reset();
                  await pronunciationSession.refetch();
                }}
              >
                {pronunciationSession.isFetching ? t("Loading...") : t("New Phrase")}
              </Button>
              <Button leftIcon={<Mic size={14} />} onClick={toggleRecording}>
                {isRecording ? t("Stop Recording") : t("Start Recording")}
              </Button>
            </div>
            <Button
              disabled={!audioBase64 || !pronunciationSession.data?.reference_text || pronunciationMutation.isPending}
              onClick={() => {
                if (pronunciationMutation.isPending) return;
                if (!audioBase64 || !pronunciationSession.data?.reference_text) return;
                pronunciationMutation.mutate({
                  reference_text: pronunciationSession.data.reference_text,
                  audio_base64: audioBase64,
                  language: "en-US",
                });
              }}
            >
              {pronunciationMutation.isPending ? t("Assessing...") : t("Check Pronunciation")}
            </Button>
          </div>
        </Card>

        <Card title="Result">
          {pronunciationMutation.data ? (
            <div className="grid gap-2 text-sm">
              <p className="adapted-muted">{t("Recognized text")}: {stripAiTags(pronunciationMutation.data.recognized_text) || "-"}</p>
              <p className="adapted-muted">{t("Accuracy")}: {pronunciationMutation.data.scores.accuracy_score ?? "-"}</p>
              <p className="adapted-muted">{t("Fluency")}: {pronunciationMutation.data.scores.fluency_score ?? "-"}</p>
              <p className="adapted-muted">{t("Completeness")}: {pronunciationMutation.data.scores.completeness_score ?? "-"}</p>
              <p className="adapted-muted">{t("Overall")}: {pronunciationMutation.data.scores.pronunciation_score ?? "-"}</p>
              <p className="adapted-muted">
                {t("Feedback")}: {stripAiTags(pronunciationMutation.data.feedback_text) || pronunciationMutation.data.error_message || "-"}
              </p>
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Play size={14} />}
                  disabled={!pronunciationMutation.data.feedback_audio_base64}
                  onClick={() => playBase64Audio(pronunciationMutation.data?.feedback_audio_base64, "feedback")}
                >
                  {activeAudio === "feedback" ? t("Stop Feedback Audio") : t("Play Feedback Audio")}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm adapted-muted">{t("No pronunciation assessment yet.")}</p>
          )}
          {pronunciationMutation.error ? (
            <p className="text-sm text-[var(--danger)]">
              {t("Pronunciation check failed")}: {pronunciationErrorMessage}
            </p>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

function getMutationErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "unknown error";
  }

  const maybeResponse = error as {
    message?: string;
    response?: {
      data?: {
        detail?: string;
        message?: string;
      };
      status?: number;
    };
  };

  const apiDetail = maybeResponse.response?.data?.detail || maybeResponse.response?.data?.message;
  if (apiDetail) {
    return apiDetail;
  }

  if (maybeResponse.response?.status) {
    return `HTTP ${maybeResponse.response.status}`;
  }

  return maybeResponse.message || "unknown error";
}

function stripAiTags(value: string | null | undefined): string {
  if (!value) return "";

  return value
    .replace(/\[(?:RU|\/RU|EN|\/EN)\]/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function encodeWav(audioBuffer: AudioBuffer): ArrayBuffer {
  const numChannels = 1;
  const sampleRate = audioBuffer.sampleRate;
  const samples = audioBuffer.getChannelData(0);
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples.length * bytesPerSample, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }

  return buffer;
}

function writeString(view: DataView, offset: number, value: string): void {
  for (let i = 0; i < value.length; i += 1) {
    view.setUint8(offset + i, value.charCodeAt(i));
  }
}
