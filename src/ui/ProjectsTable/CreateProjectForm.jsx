import { useState } from 'react';
import styled from 'styled-components';
import { useCreateProject } from '../../apis/learn/Project/hooks/useCreateProject';
import Button from '../Buttons/Button';
import Spinner from '../Spinner';

const FormContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  resize: vertical;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function CreateProjectForm({ onCloseModal, instructorId }) {
  const { createProject, isCreating } = useCreateProject();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    prerequisites: [],
    category: '',
    topic: '',
    xp: 0,
    tasks: [],
    instructorId: instructorId,
  });

  const addTask = () => {
    setFormData({
      ...formData,
      tasks: [
        ...formData.tasks,
        {
          title: '',
          description: '',
          xp: 0,
          hints: [],
          example: '',
          solution: '',
          required: '',
        },
      ],
    });
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = formData.tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task,
    );
    setFormData({ ...formData, tasks: updatedTasks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(formData);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Create Project</h2>

        <FormRow>
          <Label>Name</Label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormRow>

        <FormRow>
          <Label>Title</Label>
          <Input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Description</Label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Prerequisites (comma-separated)</Label>
          <Input
            type="text"
            required
            value={formData.prerequisites.join(',')}
            onChange={(e) =>
              setFormData({
                ...formData,
                prerequisites: e.target.value.split(','),
              })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Category</Label>
          <Input
            type="text"
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Topic</Label>
          <Input
            type="text"
            required
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>XP</Label>
          <Input
            type="number"
            required
            value={formData.xp}
            onChange={(e) =>
              setFormData({ ...formData, xp: Number(e.target.value) })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Tasks</Label>
          <Button type="button" onClick={addTask}>
            Add Task
          </Button>
          {formData.tasks.map((task, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Label>Task Title</Label>
              <Input
                type="text"
                required
                value={task.title}
                onChange={(e) =>
                  handleTaskChange(index, 'title', e.target.value)
                }
              />

              <Label>Task Description</Label>
              <Textarea
                required
                value={task.description}
                onChange={(e) =>
                  handleTaskChange(index, 'description', e.target.value)
                }
              />

              <Label>XP</Label>
              <Input
                type="number"
                required
                value={task.xp}
                onChange={(e) =>
                  handleTaskChange(index, 'xp', Number(e.target.value))
                }
              />

              <Label>Example (optional)</Label>
              <Textarea
                value={task.example}
                onChange={(e) =>
                  handleTaskChange(index, 'example', e.target.value)
                }
              />

              <Label>Solution (optional)</Label>
              <Textarea
                value={task.solution}
                onChange={(e) =>
                  handleTaskChange(index, 'solution', e.target.value)
                }
              />

              <Label>Required</Label>
              <Input
                type="text"
                required
                value={task.required}
                onChange={(e) =>
                  handleTaskChange(index, 'required', e.target.value)
                }
              />
            </div>
          ))}
        </FormRow>

        <ButtonGroup>
          <Button
            type="button"
            onClick={onCloseModal}
            variation="secondary"
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? <Spinner /> : 'Create Project'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}
