import { DEALING_ENTITY_COLUMNS } from "../../../entities/DealingEntity";
import { mockDealingData } from "../../../entities/DealingEntity/constants";
import { PageLayout, Paper } from "../../../shared/components";
import { EntityTable } from "../../../shared/components/EntityTable";

export const DealingsPage = () => {
  return (
    <PageLayout>
      <Paper>
        <EntityTable
          columns={DEALING_ENTITY_COLUMNS}
          mockData={mockDealingData}
        />
      </Paper>
    </PageLayout>
  );
};
