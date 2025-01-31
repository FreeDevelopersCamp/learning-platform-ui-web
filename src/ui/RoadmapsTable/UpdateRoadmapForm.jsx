import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUpdateRoadmap } from '../../apis/learn/Roadmap/hooks/useUpdateRoadmap';
import Button from '../Buttons/Button';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';

const FormContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem;
  margin-top: 2rem;
  background: var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem;
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

export default function UpdateRoadmapForm({ roadmap }) {
  const { updateRoadmap, isUpdating } = useUpdateRoadmap();
  const [formData, setFormData] = useState({ ...roadmap });

  useEffect(() => {
    if (roadmap) {
      setFormData({ ...roadmap });
    }
  }, [roadmap]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.tag
    ) {
      toast('Please fill in all required fields.');
      return;
    }

    const cleanedPayload = {
      ...formData,
      coursesIds: formData.coursesIds?.filter((id) => id.trim() !== '') || [],
      practicesIds:
        formData.practicesIds?.filter((id) => id.trim() !== '') || [],
      projectsIds: formData.projectsIds?.filter((id) => id.trim() !== '') || [],
      orderIds: formData.orderIds?.filter((id) => id.trim() !== '') || [],
    };

    await updateRoadmap(cleanedPayload);
  };

  return (
    <FormContainer>
      <h2>Update Roadmap</h2>
      <form onSubmit={handleSubmit}>
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
          <Label>Description</Label>
          <Input
            type="text"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Tag</Label>
          <Input
            type="text"
            required
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
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
          <Label>Courses Ids (comma-separated)</Label>
          <Input
            type="text"
            value={formData.coursesIds?.join(',') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                coursesIds: e.target.value.split(','),
              })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Practices Ids (comma-separated)</Label>
          <Input
            type="text"
            value={formData.practicesIds?.join(',') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                practicesIds: e.target.value.split(','),
              })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Projects Ids (comma-separated)</Label>
          <Input
            type="text"
            value={formData.projectsIds?.join(',') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                projectsIds: e.target.value.split(','),
              })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Order Ids (comma-separated)</Label>
          <Input
            type="text"
            value={formData.orderIds?.join(',') || ''}
            onChange={(e) =>
              setFormData({ ...formData, orderIds: e.target.value.split(',') })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Exam Id</Label>
          <Input
            type="text"
            value={formData.examId || ''}
            onChange={(e) =>
              setFormData({ ...formData, examId: e.target.value })
            }
          />
        </FormRow>

        <FormRow>
          <Label>Certification Id</Label>
          <Input
            type="text"
            value={formData.certificationId || ''}
            onChange={(e) =>
              setFormData({ ...formData, certificationId: e.target.value })
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

        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? <Spinner /> : 'Update Roadmap'}
        </Button>
      </form>
    </FormContainer>
  );
}
