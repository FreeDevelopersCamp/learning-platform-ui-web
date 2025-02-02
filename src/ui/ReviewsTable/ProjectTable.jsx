import Empty from '@/ui/Empty.jsx';
import Menus from '@/ui/Menus/Menus.jsx';
import Table from '@/ui/Tables/Table.jsx';
import ProjectRow from './ProjectRow.jsx';

function ReviewTable({ submissions, progresses }) {
  if (!submissions?.length) return <Empty resourceName="Projects Table" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 0.5fr">
        <Table.Header>
          <div>Project Name</div>
          <div>Topic</div>
          <div>Review</div>
          <div>Status</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={submissions}
          render={(submission, i) => (
            <ProjectRow
              key={submission._id}
              submission={submission}
              progress={progresses[i]}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ReviewTable;
