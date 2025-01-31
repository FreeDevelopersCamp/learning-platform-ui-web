import { useState } from 'react';
import styled from 'styled-components';
import { useUpdateCourse } from '../../apis/learn/Course/hooks/useUpdateCourse';
import Button from '../Buttons/Button';
import Spinner from '../Spinner';

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
  color: var(--color-grey-700);
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

export default function UpdateCourseForm({ course, onCloseModal }) {
  const { updateCourse, isUpdating } = useUpdateCourse();
  const [formData, setFormData] = useState({
    _id: course._id || '',
    name: course.name || '',
    description: course.description || '',
    category: course.category || '',
    topic: course.topic || '',
    duration: course.duration || 0,
    xp: course.xp || 0,
    instructorId: course.instructor._id,
    subCoursesIds: course.subCoursesIds || [],
    parentId: course.parentId || '',
    resources: course.resources || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(formData);
    onCloseModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Update Course</h2>

      <FormRow>
        <Label>Course Name</Label>
        <Input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
        />
      </FormRow>

      <FormRow>
        <Label>Duration (minutes)</Label>
        <Input
          type="number"
          required
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: Number(e.target.value) })
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
        <Label>Resources</Label>
        <Button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              resources: [
                ...formData.resources,
                { name: '', url: '', type: '', tag: '' },
              ],
            })
          }
        >
          Add Resource
        </Button>
        {formData.resources.map((res, index) => (
          <div key={index}>
            <Input
              type="text"
              placeholder="Name"
              value={res.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  resources: formData.resources.map((r, i) =>
                    i === index ? { ...r, name: e.target.value } : r,
                  ),
                })
              }
            />
            <Input
              type="text"
              placeholder="URL"
              value={res.url}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  resources: formData.resources.map((r, i) =>
                    i === index ? { ...r, url: e.target.value } : r,
                  ),
                })
              }
            />
            <Input
              type="text"
              placeholder="Type (article, video, etc.)"
              value={res.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  resources: formData.resources.map((r, i) =>
                    i === index ? { ...r, type: e.target.value } : r,
                  ),
                })
              }
            />
            <Input
              type="text"
              placeholder="Tag (free or paid)"
              value={res.tag}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  resources: formData.resources.map((r, i) =>
                    i === index ? { ...r, tag: e.target.value } : r,
                  ),
                })
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
          {isUpdating ? <Spinner /> : 'Update Course'}
        </Button>
      </ButtonGroup>
    </Form>
  );
}
