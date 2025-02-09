import { useNavigate } from 'react-router-dom';

import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';

import ConfirmDelete from '../Buttons/ConfirmDelete.jsx';
import Table from '../Tables/Table.jsx';
import Menus from '../Menus/Menus.jsx';
import Modal from '../Menus/Modal.jsx';

import Spinner from '../Spinner.jsx';
import { useDeleteRoadmap } from '../../apis/learn/Roadmap/hooks/useDeleteRoadmap.ts';
import { useUpdateRoadmap } from '../../apis/learn/Roadmap/hooks/useUpdateRoadmap.js';
import UpdateRoadmapForm from './UpdateRoadmapForm.jsx';

function RoadmapRow({ roadmap }) {
  let { name, category, topic, xp } = roadmap;
  console.log(name);

  const navigate = useNavigate();
  const { isDeleting, deleteRoadmap } = useDeleteRoadmap();
  const { isUpdating, updateRoadmap } = useUpdateRoadmap();

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

      <div>{topic}</div>

      <div className="flex items-center gap-4">{xp}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={roadmap._id} />
          <Menus.List id={roadmap._id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/roadmap/${roadmap._id}`)}
            >
              See details
            </Menus.Button>

            <Modal.Open opens={`update-${roadmap._id}`}>
              <Menus.Button key={`${roadmap._id}`} icon={<HiPencil />}>
                Update roadmap
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens={`delete-${roadmap._id}`}>
              <Menus.Button icon={<HiTrash />}>Delete roadmap</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window
          name={`update-${roadmap._id}`}
          key={`update-${roadmap._id}`}
        >
          <UpdateRoadmapForm roadmap={roadmap} />
        </Modal.Window>

        <Modal.Window
          name={`delete-${roadmap._id}`}
          key={`delete-${roadmap._id}`}
        >
          <ConfirmDelete
            resourceName="roadmap"
            disabled={isLoading}
            onConfirm={() => deleteRoadmap(roadmap._id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default RoadmapRow;
