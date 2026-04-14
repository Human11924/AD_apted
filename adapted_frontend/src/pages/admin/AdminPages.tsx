import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";

function AdminEntityPage({ title }: { title: string }) {
  const { t } = useI18n();

  return (
    <div>
      <PageHeader title={title} description="MVP management view with scalable table scaffolding." />
      <Card>
        <DataTable
          data={[
            { id: "1", name: "Record Alpha", status: t("Active"), updated: "2026-04-12" },
            { id: "2", name: "Record Beta", status: t("Active"), updated: "2026-04-11" },
            { id: "3", name: "Record Gamma", status: t("pending"), updated: "2026-04-10" },
          ]}
          columns={[
            { key: "id", header: "ID", render: (row) => row.id },
            { key: "name", header: "Name", render: (row) => row.name },
            { key: "status", header: "Status", render: (row) => row.status },
            { key: "updated", header: "Updated", render: (row) => row.updated },
          ]}
        />
      </Card>
    </div>
  );
}

export function AdminDashboardPage() {
  const { t } = useI18n();

  return (
    <div>
      <PageHeader title="Admin Overview" description="Global platform monitoring across all entities." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Users", "Companies", "Active Groups", "Monthly Orders"].map((metric, index) => (
          <Card key={metric}>
            <p className="text-sm adapted-muted">{t(metric)}</p>
            <p className="mt-2 text-2xl font-semibold">{[1284, 34, 62, 18][index]}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const AdminUsersPage = () => <AdminEntityPage title="Manage Users" />;
export const AdminCompaniesPage = () => <AdminEntityPage title="Manage Companies" />;
export const AdminTeachersPage = () => <AdminEntityPage title="Manage Teachers" />;
export const AdminStudentsPage = () => <AdminEntityPage title="Manage Students" />;
export const AdminCoursesPage = () => <AdminEntityPage title="Manage Courses" />;
export const AdminGroupsPage = () => <AdminEntityPage title="Manage Course Groups" />;
export const AdminOrdersPage = () => <AdminEntityPage title="Manage Company Orders" />;
export const AdminAccessCodesPage = () => <AdminEntityPage title="Manage Access Codes" />;
