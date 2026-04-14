import { Navigate, Route, Routes } from "react-router-dom";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { ContactPage } from "@/pages/public/ContactPage";
import { LandingPage } from "@/pages/public/LandingPage";
import { LoginPage } from "@/pages/public/LoginPage";
import { PricingPage } from "@/pages/public/PricingPage";
import { RegisterByCodePage } from "@/pages/public/RegisterByCodePage";
import { RoleProtectedRoute } from "@/routes/RoleProtectedRoute";
import { useAuthStore } from "@/store/authStore";

import { AdminAccessCodesPage, AdminCompaniesPage, AdminCoursesPage, AdminDashboardPage, AdminGroupsPage, AdminOrdersPage, AdminStudentsPage, AdminTeachersPage, AdminUsersPage } from "@/pages/admin/AdminPages";
import { EmployerAccessCodesPage, EmployerAnalyticsPage, EmployerDashboardPage, EmployerGroupsPage, EmployerSettingsPage, EmployerStudentsPage } from "@/pages/employer/EmployerPages";
import { StudentCoursesPage, StudentDashboardPage, StudentGenerateQuizPage, StudentLessonPage, StudentProfilePage, StudentProgressPage, StudentPronunciationPracticePage } from "@/pages/student/StudentPages";
import { TeacherCourseStructurePage, TeacherDashboardPage, TeacherGroupDetailsPage, TeacherGroupsPage, TeacherStudentProgressPage } from "@/pages/teacher/TeacherPages";

export function AppRouter() {
  const user = useAuthStore((state) => state.user);

  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/pricing/" element={<PricingPage />} />
        <Route path="/pricing/*" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-by-code" element={<RegisterByCodePage />} />
      </Route>

      <Route element={<RoleProtectedRoute role="employer" />}>
        <Route path="/employer" element={<DashboardLayout />}>
          <Route index element={<EmployerDashboardPage />} />
          <Route path="students" element={<EmployerStudentsPage />} />
          <Route path="groups" element={<EmployerGroupsPage />} />
          <Route path="analytics" element={<EmployerAnalyticsPage />} />
          <Route path="access-codes" element={<EmployerAccessCodesPage />} />
          <Route path="settings" element={<EmployerSettingsPage />} />
        </Route>
      </Route>

      <Route element={<RoleProtectedRoute role="teacher" />}>
        <Route path="/teacher" element={<DashboardLayout />}>
          <Route index element={<TeacherDashboardPage />} />
          <Route path="groups" element={<TeacherGroupsPage />} />
          <Route path="groups/:groupId" element={<TeacherGroupDetailsPage />} />
          <Route path="course-structure" element={<TeacherCourseStructurePage />} />
          <Route path="student-progress" element={<TeacherStudentProgressPage />} />
        </Route>
      </Route>

      <Route element={<RoleProtectedRoute role="student" />}>
        <Route path="/student" element={<DashboardLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="courses" element={<StudentCoursesPage />} />
          <Route path="courses/:courseId/lesson/:lessonId" element={<StudentLessonPage />} />
          <Route path="ai" element={<Navigate to="/student/ai/quiz" replace />} />
          <Route path="ai/quiz" element={<StudentGenerateQuizPage />} />
          <Route path="ai/pronunciation" element={<StudentPronunciationPracticePage />} />
          <Route path="progress" element={<StudentProgressPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>
      </Route>

      <Route element={<RoleProtectedRoute role="admin" />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="companies" element={<AdminCompaniesPage />} />
          <Route path="teachers" element={<AdminTeachersPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="groups" element={<AdminGroupsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="access-codes" element={<AdminAccessCodesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={user ? `/${user.role}` : "/"} replace />} />
    </Routes>
  );
}
