import { useNavigate } from 'react-router-dom';

import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';

import ConfirmApprove from '../Buttons/ConfirmApprove.jsx';
import ConfirmDelete from '../Buttons/ConfirmDelete.jsx';
import Table from '../Tables/Table.jsx';
import Menus from '../Menus/Menus.jsx';
import Modal from '../Menus/Modal.jsx';

import Spinner from '../Spinner.jsx';
import { useDeleteProject } from '../../apis/learn/Project/hooks/useDeleteProject';
import { useUpdateProject } from '../../apis/learn/Project/hooks/useUpdateProject';
import UpdateProjectForm from './UpdateProjectForm.jsx';

function ProjectRow({ project }) {
  let { name, category, topic, xp } = project;

  const navigate = useNavigate();
  const { isDeleting, deleteProject } = useDeleteProject();
  const { isUpdating, updateProject } = useUpdateProject();

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
          <Menus.Toggle id={project._id} />
          <Menus.List id={project._id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/project/${project._id}`)}
            >
              See details
            </Menus.Button>

            <Modal.Open opens={`update-${project._id}`}>
              <Menus.Button icon={<HiPencil />}>Update project</Menus.Button>
            </Modal.Open>
            <Modal.Open opens={`delete-${project._id}`}>
              <Menus.Button icon={<HiTrash />}>Delete project</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name={`update-${project._id}`}>
          <UpdateProjectForm project={project} />
        </Modal.Window>

        <Modal.Window
          name={`delete-${project._id}`}
          key={`delete-${project._id}`}
        >
          <ConfirmDelete
            resourceName="project"
            disabled={isLoading}
            onConfirm={() => deleteProject(project._id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ProjectRow;
