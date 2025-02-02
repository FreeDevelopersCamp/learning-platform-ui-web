import { HiEye, HiPencil } from 'react-icons/hi2';
import ConfirmReview from '../Buttons/ConfirmReview.jsx';
import Table from '../Tables/Table.jsx';
import Menus from '../Menus/Menus.jsx';
import Modal from '../Menus/Modal.jsx';
import Spinner from '../Spinner.jsx';
import Empty from '../Empty.jsx';

import { getSubmissionCode } from '../../utils/helpers.js';
import { useGetProject } from '../../apis/learn/Project/hooks/useGetProject.js';
import { useUpdateProgress } from '../../apis/learn/Progress/hooks/useUpdateProgress';

function ProjectRow({ submission, progress }) {
  const { project, projectLoading } = useGetProject(submission?.id);
  const { updateProgress, isLoading } = useUpdateProgress();

  if (isLoading || projectLoading) return <Spinner />;
  if (!project) return <Empty>No projects found.</Empty>;

  const updateProgressStatus = (submissionId, review) => {
    if (!progress || !Array.isArray(progress.currentProjectsIds)) {
      console.error('❌ Progress or currentProjectsIds is missing:', progress);
      return;
    }

    console.log('✅ Updating Progress for:', submissionId, review);

    const updatedProjects = progress.currentProjectsIds.map((item) => {
      if (item.id === submissionId) return { ...item, status: '2', review };
      return item;
    });

    updateProgress({ ...progress, currentProjectsIds: updatedProjects });
  };

  return (
    <Table.Row>
      <div className="flex gap-4">
        <span>{project?.name}</span>
      </div>
      <div className="flex gap-4">
        <span>{project?.topic}</span>
      </div>

      <div className="flex items-center gap-4">
        {submission.review || 'No review yet.'}
      </div>
      <div>{getSubmissionCode(submission.status)}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={`menu-${project?._id}`} />
          <Menus.List id={`menu-${project?._id}`}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() =>
                window.open(submission.url, '_blank', 'noopener,noreferrer')
              }
            >
              Go To GitHub
            </Menus.Button>

            {/* ✅ Re-Added Modal.Open */}
            <Modal.Open opens={`pass-${project?._id}`}>
              <Menus.Button icon={<HiPencil />}>Mark Passed</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* ✅ Ensure Modal.Window has the same name as the Modal.Open */}
        <Modal.Window name={`pass-${project?._id}`}>
          <ConfirmReview
            resourceName="project"
            disabled={isLoading}
            submissionId={submission._id} // ✅ Pass submission ID
            onConfirm={(reviewText) =>
              updateProgressStatus(submission._id, reviewText)
            }
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ProjectRow;
