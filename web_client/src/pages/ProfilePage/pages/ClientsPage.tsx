import {
  USER_ENTITY_COLUMNS,
  mockUserData,
} from "../../../entities/UserEntity/constants";
import { PageLayout, Paper } from "../../../shared/components";
import { EntityTable } from "../../../shared/components/EntityTable";

export const ClientsPage = () => {
  return (
    <PageLayout>
      <Paper>
        <EntityTable columns={USER_ENTITY_COLUMNS} mockData={mockUserData} />
      </Paper>
    </PageLayout>
  );
};
