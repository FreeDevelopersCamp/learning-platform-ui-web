import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';

import ConfirmApprove from '../Buttons/ConfirmApprove.jsx';
import ConfirmDelete from '../Buttons/ConfirmDelete.jsx';
import Table from '../Tables/Table.jsx';
import Menus from '../Menus/Menus.jsx';
import Modal from '../Menus/Modal.jsx';

import Spinner from '../Spinner.jsx';
import { useDeleteCourse } from '../../apis/learn/Course/hooks/useDeleteCourse.ts';
import { useUpdateCourse } from '../../apis/learn/Course/hooks/useUpdateCourse.ts';

function CourseRow({ course }) {
  let { name, category, topic, duration } = course;

  const navigate = useNavigate();
  const { isDeleting, deleteCourse } = useDeleteCourse();
  const { isUpdating, updateCourse } = useUpdateCourse();

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

      <div className="flex items-center gap-4">{duration}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={course._id} />
          <Menus.List id={course._id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/course/${course._id}`)}
            >
              See details
            </Menus.Button>

            <Modal.Open opens={`update-${course._id}`}>
              <Menus.Button key={`${course._id}`} icon={<HiPencil />}>
                Update course
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens={`delete-${course._id}`}>
              <Menus.Button icon={<HiTrash />}>Delete course</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window
          name={`update-${course._id}`}
          key={`update-${course._id}`}
        >
          <ConfirmApprove
            resourceName="course"
            disabled={isLoading}
            // onConfirm={() => (user.roleId, 'approve')}
            key={course._id}
          />
        </Modal.Window>

        <Modal.Window
          name={`delete-${course._id}`}
          key={`delete-${course._id}`}
        >
          <ConfirmDelete
            resourceName="course"
            disabled={isLoading}
            onConfirm={() => deleteCourse(course._id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CourseRow;
