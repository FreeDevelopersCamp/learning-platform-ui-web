import CertificationTable from '../../ui/Certifications/CertificationTable';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function CertificationsPage() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Certifications</Heading>
      </Row>
      <CertificationTable role="learner" />
    </>
  );
}

export default CertificationsPage;
