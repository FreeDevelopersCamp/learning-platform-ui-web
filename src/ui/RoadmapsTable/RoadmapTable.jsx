import Empty from '@/ui/Empty.jsx';
import Menus from '@/ui/Menus/Menus.jsx';
import Table from '@/ui/Tables/Table.jsx';
import Pagination from '../Tables/Pagination.jsx';
import RoadmapRow from './RoadmapRow.jsx';

function RoadmapTable({ roadmaps, count }) {
  if (!roadmaps?.length) return <Empty resourceName="Roadmaps Table" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 0.5fr">
        <Table.Header>
          <div>Roadmap Name</div>
          <div>Category</div>
          <div>Topic</div>
          <div>XP</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={roadmaps}
          render={(roadmap) => (
            <RoadmapRow key={roadmap._id} roadmap={roadmap} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RoadmapTable;
