import {
  ADMIN_ENTITY_COLUMNS,
  mockAdminData,
} from "../../../entities/UserEntity/constants";
import { PageLayout, Paper } from "../../../shared/components";
import { EntityTable } from "../../../shared/components/EntityTable";

export const EmployeesPage = () => {
  return (
    <PageLayout>
      <Paper>
        <EntityTable columns={ADMIN_ENTITY_COLUMNS} mockData={mockAdminData} />
      </Paper>
    </PageLayout>
  );
};
