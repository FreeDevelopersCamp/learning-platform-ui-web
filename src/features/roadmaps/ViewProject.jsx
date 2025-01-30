import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { useFetchProjectById } from '../../hooks/projects/useProject';
import { useUpdateProgress } from '../../hooks/learner/useProgress';

import Spinner from '../../ui/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;
  padding: 2rem;
`;

const TaskContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;

const TaskTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const HintButton = styled.button`
  background-color: var(--color-blue-600);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    background-color: var(--color-blue-800);
  }
`;

const SubmitProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
  align-items: flex-start;
  width: 100%;
`;

const GithubLabel = styled.label`
  font-weight: bold;
  font-size: 1.5rem;
`;

const GithubInput = styled.input`
  width: 33rem;
  padding: 10px;
  border: 2px solid var(--color-grey-300);
  border-radius: 5px;
  font-size: 1.3rem;
  background-color: var(--color-grey-0);
  transition: border-color 0.1s ease-in-out;

  &:focus {
    outline: none;
    border-color: var(--color-blue-600);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-600);
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--color-green-600);
  color: var(--color-grey-0);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-green-700);
  }

  &:disabled {
    background-color: var(--color-green-700);
    cursor: not-allowed;
  }
`;

const ResubmitButton = styled.button`
  background-color: var(--color-orange-600);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-orange-800);
  }
`;

const ShowReviewButton = styled.button`
  background-color: var(--color-blue-600);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-800);
  }
`;

const ReviewContainer = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-grey-400);
  border-radius: 5px;
  background-color: var(--color-grey-100);
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function ViewProject({ order, userProgress }) {
  const { data: project, isLoading } = useFetchProjectById(order.id);
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  const [existingProject, setExistingProject] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [projectStatus, setProjectStatus] = useState(null);
  const [review, setReview] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [hintsVisible, setHintsVisible] = useState({});

  useEffect(() => {
    if (!order?.id || !userProgress?.currentProjectsIds) return;

    const foundProject = userProgress.currentProjectsIds.find(
      (p) => p.id?.toString() === order.id?.toString(),
    );
    setExistingProject(foundProject || null);
  }, [order.id, userProgress]);

  useEffect(() => {
    if (existingProject) {
      setGithubLink(existingProject.url || '');
      setProjectStatus(existingProject.status);
      setReview(existingProject.review || '');
    } else {
      setGithubLink('');
      setProjectStatus(null);
      setReview('');
    }
  }, [existingProject]);

  if (isLoading || updatingProgress) return <Spinner />;

  const toggleHint = (index) => {
    setHintsVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleGithubLinkChange = (event) => {
    setGithubLink(event.target.value);
  };

  const handleSubmitProject = async () => {
    if (!userProgress || !userProgress.user) {
      toast.error('User progress is missing.');
      return;
    }

    if (!githubLink) {
      toast.error('Please provide a GitHub link before submitting.');
      return;
    }

    if (!Array.isArray(userProgress.currentProjectsIds)) {
      userProgress.currentProjectsIds = [];
      toast.success('Failed to update progress!');
    }

    if (
      userProgress.currentProjectsIds.some(
        (p) => p.project?._id?.toString() === project?._id?.toString(),
      )
    ) {
      toast.success('Project already submitted.');
      return;
    }

    const newProjectProgress = {
      id: project._id,
      status: '0',
      url: githubLink,
      review: '',
    };

    const updatedProgress = {
      ...userProgress,
      userId: userProgress.user._id,
      currentProjectsIds: [
        ...(userProgress.currentProjectsIds || []),
        newProjectProgress,
      ],
    };

    updateProgress(updatedProgress, {
      onError: (error) => {
        console.error(
          '❌ Failed to update progress:',
          error.response?.data || error,
        );
      },
    });
    setProjectStatus('0');
    toast.success('Project submitted successfully!');
  };

  const handleResubmitProject = () => {
    if (!githubLink) {
      toast.error('Please provide a GitHub link before resubmitting.');
      return;
    }

    if (!userProgress || !userProgress.user) {
      toast.error('User progress is missing.');
      return;
    }

    const updatedProjects = userProgress.currentProjectsIds.map((p) =>
      p.id === project._id ? { ...p, url: githubLink, status: '0', review } : p,
    );

    const updatedProgress = {
      ...userProgress,
      userId: userProgress.user._id,
      currentProjectsIds: updatedProjects,
    };

    updateProgress(updatedProgress, {
      onError: (error) => {
        console.error(
          '❌ Failed to update progress:',
          error.response?.data || error,
        );
      },
    });

    setProjectStatus('0');
    toast.success('Project resubmitted successfully!');
  };

  return (
    <Container>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
          {project.name}
        </h1>
        <p>{project.description}</p>
      </div>

      <h2 style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Tasks</h2>
      {project?.tasks?.map((task, index) => (
        <TaskContainer key={index}>
          <TaskTitle>
            {index + 1}) {task.title}
          </TaskTitle>
          <p style={{ marginBottom: '8px' }}>{task.description}</p>

          {task?.hints?.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <HintButton onClick={() => toggleHint(index)}>
                {hintsVisible[index] ? 'Hide Hints' : 'Show Hints'}
              </HintButton>
              {hintsVisible[index] &&
                task?.hints?.map((hint, hintIndex) => (
                  <p key={hintIndex}>Hint: {hint.description}</p>
                ))}
            </div>
          )}
        </TaskContainer>
      ))}

      <SubmitProjectContainer>
        <GithubLabel>GitHub Link:</GithubLabel>
        <GithubInput
          type="url"
          value={githubLink}
          onChange={handleGithubLinkChange}
          placeholder="https://github.com/username/repo"
          disabled={projectStatus === '0' || projectStatus === '2'}
        />

        {projectStatus === '0' ? (
          <SubmitButton disabled>Submitted</SubmitButton>
        ) : projectStatus === '1' ? (
          <ButtonGroup>
            <ResubmitButton onClick={handleResubmitProject}>
              ReSubmit Project
            </ResubmitButton>
            <ShowReviewButton onClick={() => setShowReview(!showReview)}>
              {showReview ? 'Hide Review' : 'Show Review'}
            </ShowReviewButton>
          </ButtonGroup>
        ) : projectStatus === '2' ? (
          <>
            <SubmitButton disabled>Passed</SubmitButton>
            <ReviewContainer>
              {review || 'No review available.'}
            </ReviewContainer>
          </>
        ) : (
          <SubmitButton onClick={handleSubmitProject}>
            Submit Project
          </SubmitButton>
        )}

        {showReview && projectStatus !== '2' && (
          <ReviewContainer>{review || 'No review available.'}</ReviewContainer>
        )}
      </SubmitProjectContainer>
    </Container>
  );
}

export default ViewProject;
