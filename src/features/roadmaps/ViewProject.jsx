import React, { useState } from 'react';
import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import { useFetchProjectById } from '../../hooks/projects/useProject';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

const TaskContainer = styled.div`
  margin-bottom: 2rem;
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
  gap: 1rem;
  margin-top: 1.5rem;
  align-items: flex-start;
`;

const FileInput = styled.input`
  margin: 0.5rem 0;
`;

const SubmitButton = styled.button`
  background-color: var(--color-green-600);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-green-800);
  }
`;

function ViewProject({ order }) {
  const { data: project, isLoading, error } = useFetchProjectById(order.id);
  const [hintsVisible, setHintsVisible] = useState({});
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [githubLink, setGithubLink] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  if (isLoading || !project || error) return <Spinner />;

  const toggleHint = (index) => {
    setHintsVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleTaskCompletion = (taskTitle) => {
    setTasksCompleted((prev) => [...prev, taskTitle]);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleGithubLinkChange = (event) => {
    setGithubLink(event.target.value);
  };

  const handleSubmitProject = () => {
    if (tasksCompleted.length < project.tasks.length) {
      alert('Please complete all tasks before submitting.');
      return;
    }

    if (!selectedFile && !githubLink) {
      alert('Please provide a GitHub link or upload a ZIP or RAR file.');
      return;
    }

    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // Add logic for file upload
    }

    if (githubLink) {
      console.log('GitHub link submitted:', githubLink);
      // Add logic for submitting GitHub link
    }

    alert('Project submitted successfully!');
  };

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
          {project.name}
        </h1>
        <p>{project.description}</p>
      </div>

      <h2 style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Tasks</h2>
      {project.tasks.map((task, index) => (
        <TaskContainer key={index}>
          <TaskTitle>
            {index + 1}) {task.title}
          </TaskTitle>
          <p style={{ marginBottom: '8px' }}>{task.description}</p>

          {task.hints.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <HintButton onClick={() => toggleHint(index)}>
                {hintsVisible[index] ? 'Hide Hints' : 'Show Hints'}
              </HintButton>
              {hintsVisible[index] &&
                task.hints.map((hint, hintIndex) => (
                  <p key={hintIndex}>Hint: {hint.description}</p>
                ))}
            </div>
          )}
        </TaskContainer>
      ))}

      <SubmitProjectContainer>
        <label>
          Upload ZIP or RAR File:
          <FileInput
            type="file"
            accept=".zip,.rar"
            onChange={handleFileChange}
            style={{ width: '25rem', paddingLeft: '5px' }}
          />
        </label>

        <label>
          GitHub Link:
          <input
            type="url"
            value={githubLink}
            onChange={handleGithubLinkChange}
            placeholder="https://github.com/username/repo"
            style={{ width: '33rem', padding: '5px' }}
          />
        </label>

        <SubmitButton onClick={handleSubmitProject}>
          Submit Project
        </SubmitButton>
      </SubmitProjectContainer>
    </Container>
  );
}

export default ViewProject;
