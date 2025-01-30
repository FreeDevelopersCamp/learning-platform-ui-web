import { useNavigate } from 'react-router-dom';

import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';

import ConfirmApprove from '../Buttons/ConfirmApprove.jsx';
import ConfirmDelete from '../Buttons/ConfirmDelete.jsx';
import Table from '../Tables/Table.jsx';
import Menus from '../Menus/Menus.jsx';
import Modal from '../Menus/Modal.jsx';

import Spinner from '../Spinner.jsx';
import { useDeletePractice } from '../../apis/learn/Practice/hooks/useDeletePractice.ts';
import { useUpdatePractice } from '../../apis/learn/Practice/hooks/useUpdatePractice.ts';

function PracticeRow({ practice }) {
  let { name, category, difficulty, xp } = practice;

  const navigate = useNavigate();
  const { isDeleting, deletePractice } = useDeletePractice();
  const { isUpdating, updatePractice } = useUpdatePractice();

  const isLoading = isDeleting || isUpdating;

  if (isLoading) return <Spinner />;

  return (
    <Table.Row>
      <div className="flex gap-4">
        <span>{name}</span>
      </div>
      <div className="flex gap-4">
        <span>{category}</span>
      </div>

      <div>{difficulty}</div>

      <div className="flex items-center gap-4">{xp}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={practice._id} />
          <Menus.List id={practice._id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/practice/${practice._id}`)}
            >
              See details
            </Menus.Button>

            <Modal.Open opens={`update-${practice._id}`}>
              <Menus.Button key={`${practice._id}`} icon={<HiPencil />}>
                Update practice
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens={`delete-${practice._id}`}>
              <Menus.Button icon={<HiTrash />}>Delete practice</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window
          name={`update-${practice._id}`}
          key={`update-${practice._id}`}
        >
          <ConfirmApprove
            resourceName="practice"
            disabled={isLoading}
            key={practice._id}
          />
        </Modal.Window>

        <Modal.Window
          name={`delete-${practice._id}`}
          key={`delete-${practice._id}`}
        >
          <ConfirmDelete
            resourceName="practice"
            disabled={isLoading}
            onConfirm={() => deletePractice(practice._id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default PracticeRow;
