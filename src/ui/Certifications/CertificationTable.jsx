import Menus from '@/ui/Menus/Menus.jsx';
import Table from '@/ui/Tables/Table.jsx';
import CertificationRow from './CertificationRow.jsx';

function CertificationTable() {
  const dumps = ['Yes', 'No'];
  return (
    <Menus>
      <Table columns="2fr  2fr 0.5fr">
        <Table.Header>
          <div>Certification Name</div>
        </Table.Header>

        <Table.Body
          data={dumps}
          render={(dump) => <CertificationRow id={dump} dump={dump} />}
        />
      </Table>
    </Menus>
  );
}

export default CertificationTable;
