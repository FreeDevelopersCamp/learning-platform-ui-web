import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUpdateProject } from '../../apis/learn/Project/hooks/useUpdateProject';
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

export default function UpdateProjectForm({ project, onCloseModal }) {
  const { updateProject, isUpdating } = useUpdateProject();
  const [formData, setFormData] = useState(project);

  useEffect(() => {
    setFormData(project);
  }, [project]);

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
    updateProject(formData);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Update Project</h2>

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
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? <Spinner /> : 'Update Project'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}
