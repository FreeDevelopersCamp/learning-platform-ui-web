import Empty from '@/ui/Empty.jsx';

import Menus from '@/ui/Menus/Menus.jsx';
import Table from '@/ui/Tables/Table.jsx';
import Pagination from '../Tables/Pagination.jsx';
import ProjectRow from './ProjectRow.jsx';

function ProjectTable({ projects, count }) {
  if (!projects?.length) return <Empty resourceName="Projects Table" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 0.5fr">
        <Table.Header>
          <div>Project Name</div>
          <div>Category</div>
          <div>Topic</div>
          <div>Duration</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={projects}
          render={(project) => (
            <ProjectRow key={project._id} project={project} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ProjectTable;
