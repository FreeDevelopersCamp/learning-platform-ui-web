import Empty from '@/ui/Empty.jsx';
import Menus from '@/ui/Menus/Menus.jsx';
import Table from '@/ui/Tables/Table.jsx';
import Pagination from '../Tables/Pagination.jsx';
import PracticeRow from './PracticeRow.jsx';

function PracticeTable({ practices, count }) {
  console.log(practices);
  if (!practices?.length) return <Empty resourceName="Practices Table" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 0.5fr">
        <Table.Header>
          <div>Practice Name</div>
          <div>Category</div>
          <div>Difficulty</div>
          <div>XP</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={practices}
          render={(practice) => (
            <PracticeRow key={practice._id} practice={practice} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PracticeTable;
