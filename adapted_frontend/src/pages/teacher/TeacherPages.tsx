import { useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useCreateTeacherCourse, useTeacherCourses, useTeacherGroupProgress, useTeacherGroups } from "@/hooks/queries/useTeacherQueries";

export function TeacherDashboardPage() {
  const groupsQuery = useTeacherGroups();
  const coursesQuery = useTeacherCourses();
  const groups = groupsQuery.data ?? [];
  const avgCompletion =
    groups.length > 0
      ? Math.round(groups.reduce((acc, group) => acc + (group.students_count > 0 ? 70 : 0), 0) / groups.length)
      : 0;

  return (
    <div>
      <PageHeader title="Teacher Dashboard" description="Manage cohorts, lesson cadence, and learner outcomes." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm adapted-muted">Assigned Groups</p>
          <p className="mt-2 text-2xl font-semibold">{groups.length}</p>
        </Card>
        <Card>
          <p className="text-sm adapted-muted">Active Students</p>
          <p className="mt-2 text-2xl font-semibold">{groups.reduce((acc, group) => acc + group.students_count, 0)}</p>
        </Card>
        <Card>
          <p className="text-sm adapted-muted">Avg Completion</p>
          <p className="mt-2 text-2xl font-semibold">{avgCompletion}%</p>
        </Card>
        <Card>
          <p className="text-sm adapted-muted">Assigned Courses</p>
          <p className="mt-2 text-2xl font-semibold">{coursesQuery.data?.length ?? 0}</p>
        </Card>
      </div>
    </div>
  );
}

export function TeacherGroupsPage() {
  const groupsQuery = useTeacherGroups();
  const groups = groupsQuery.data ?? [];

  return (
    <div>
      <PageHeader title="Assigned Groups" description="Groups where you lead sessions and mentor students." />
      <div className="grid gap-4">
        {groups.map((group) => (
          <Card key={group.group_id} title={group.group_name} subtitle={`${group.course_title} · ${group.students_count} students`}>
            <ProgressBar value={group.students_count > 0 ? 70 : 0} />
            <div className="mt-4">
              <Link to={`/teacher/groups/${group.group_id}`}>
                <Button size="sm" variant="secondary">
                  Open Group
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TeacherGroupDetailsPage() {
  const groupsQuery = useTeacherGroups();
  const firstGroupId = groupsQuery.data?.[0]?.group_id;
  const progressQuery = useTeacherGroupProgress(firstGroupId);

  return (
    <div>
      <PageHeader title="Group Details" description="Students, attendance pulse, and lesson milestones." />
      <Card title="Students">
        <DataTable
          data={
            progressQuery.data?.map((item) => ({
              name: item.full_name,
              progress: item.progress_percent,
              attendance: "-",
            })) ?? []
          }
          columns={[
            { key: "name", header: "Student", render: (row) => row.name },
            { key: "progress", header: "Progress", render: (row) => <ProgressBar value={row.progress} /> },
            { key: "attendance", header: "Attendance", render: (row) => row.attendance },
          ]}
        />
      </Card>
    </div>
  );
}

export function TeacherCourseStructurePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("A2");
  const [durationWeeks, setDurationWeeks] = useState("8");
  const coursesQuery = useTeacherCourses();
  const createCourse = useCreateTeacherCourse();

  return (
    <div>
      <PageHeader title="Course Structure" description="Module and lesson flow for practical workplace English." />
      <Card title="Create Course" subtitle="Teachers can publish new course templates for future cohorts.">
        <form
          className="grid gap-3 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            createCourse.mutate({
              title,
              description,
              level,
              duration_weeks: Number(durationWeeks),
              is_published: true,
            });
          }}
        >
          <Input label="Title" value={title} onChange={(event) => setTitle(event.target.value)} required />
          <Input label="Level" value={level} onChange={(event) => setLevel(event.target.value)} required />
          <Input
            label="Duration (weeks)"
            type="number"
            min={1}
            value={durationWeeks}
            onChange={(event) => setDurationWeeks(event.target.value)}
            required
          />
          <Input label="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
          <div className="md:col-span-2">
            <Button type="submit" disabled={createCourse.isPending}>
              {createCourse.isPending ? "Creating..." : "Create Course"}
            </Button>
          </div>
          {createCourse.isError ? <p className="text-sm text-[var(--danger)] md:col-span-2">Course creation failed.</p> : null}
          {createCourse.isSuccess ? <p className="text-sm text-emerald-700 md:col-span-2">Course created successfully.</p> : null}
        </form>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {(coursesQuery.data ?? []).slice(0, 4).map((course, index) => (
          <Card key={course.course_id} title={course.title} subtitle={`${course.level} · ${course.duration_weeks} weeks`}>
              <p className="text-sm adapted-muted">Focus: Scenario-based speaking and service confidence.</p>
              <Badge tone={index < 2 ? "success" : "neutral"}>{index < 2 ? "In progress" : "Upcoming"}</Badge>
            </Card>
          ))}
      </div>
    </div>
  );
}

export function TeacherStudentProgressPage() {
  const groupsQuery = useTeacherGroups();
  const selectedGroupId = groupsQuery.data?.[0]?.group_id;
  const progressQuery = useTeacherGroupProgress(selectedGroupId);

  const rows = (progressQuery.data ?? []).map((item) => {
    const risk = item.progress_percent < 45 ? "high" : item.progress_percent < 75 ? "low" : "none";
    return {
      student: item.full_name,
      module: `Completed ${item.lessons_completed}/${item.total_lessons} lessons`,
      completion: item.progress_percent,
      risk,
    };
  });

  return (
    <div>
      <PageHeader title="Student Progress" description="Track learner-level completion and intervention needs." />
      <Card>
        <DataTable
          data={rows}
          columns={[
            { key: "student", header: "Student", render: (row) => row.student },
            { key: "module", header: "Current Module", render: (row) => row.module },
            { key: "completion", header: "Completion", render: (row) => <ProgressBar value={row.completion} /> },
            {
              key: "risk",
              header: "Risk",
              render: (row) => <Badge tone={row.risk === "high" ? "warning" : row.risk === "low" ? "info" : "success"}>{row.risk}</Badge>,
            },
          ]}
        />
      </Card>
    </div>
  );
}
