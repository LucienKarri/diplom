import { REQUEST_ENTITY_COLUMNS } from "../../../entities/RequestEntity";
import { mockRequestData } from "../../../entities/RequestEntity/constants";
import { PageLayout, Paper } from "../../../shared/components";
import { EntityTable } from "../../../shared/components/EntityTable";

export const RequestsPage = () => {
  return (
    <PageLayout>
      <Paper>
        <EntityTable
          columns={REQUEST_ENTITY_COLUMNS}
          mockData={mockRequestData}
        />
      </Paper>
    </PageLayout>
  );
};
