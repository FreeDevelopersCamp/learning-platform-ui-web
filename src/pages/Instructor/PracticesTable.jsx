import { useGetInstructor } from '../../apis/core/Instructor/hooks/useGetInstructor';
import { useListPractice } from '../../apis/learn/Practice/hooks/useListPractice';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useAuth } from '../../contexts/auth/AuthContext';

import Heading from '../../ui/Heading';
import PracticeTable from '../../ui/PracticesTable/PracticeTable';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Menus/Modal';
import Button from '../../ui/Buttons/Button';
import CreatePracticeForm from '../../ui/PracticesTable/CreatePracticeForm';

function PracticesTable() {
  const { session, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);
  const { instructor, instructorLoading } = useGetInstructor(user?._id);
  const {
    instructorPractices,
    isLoading: practiceLoading,
    count,
  } = useListPractice(instructor?._id);

  if (isLoading || userLoading || instructorLoading || practiceLoading)
    return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Practices</Heading>
        <Modal>
          <Modal.Open opens="create-practice">
            <Button variation="primary">Add New Practice</Button>
          </Modal.Open>
          <Modal.Window name="create-practice">
            <CreatePracticeForm instructorId={instructor._id} />
          </Modal.Window>
        </Modal>
      </Row>
      <PracticeTable practices={instructorPractices} count={count} />
    </>
  );
}

export default PracticesTable;
