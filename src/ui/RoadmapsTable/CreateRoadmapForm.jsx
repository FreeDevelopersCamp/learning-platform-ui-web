import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCreateRoadmap } from '../../apis/learn/Roadmap/hooks/useCreateRoadmap';
import Button from '../Buttons/Button';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';

const FormContainer = styled.div`
  max-height: 100%;
  width: 70%;
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

export default function CreateRoadmapForm(instructorId) {
  const { createRoadmap, isCreating } = useCreateRoadmap();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tag: '',
    category: '',
    topic: '',
    instructorId: instructorId.instructorId,
    coursesIds: [],
    practicesIds: [],
    projectsIds: [],
    examId: '',
    certificationId: '',
    orderIds: [],
    prerequisites: [],
    xp: 0,
    duration: 0,
  });

  const addFAQ = () => {
    setFormData({
      ...formData,
      frequentlyAskedQuestions: [
        ...formData.frequentlyAskedQuestions,
        { question: '', answer: '' },
      ],
    });
  };

  const handleFAQChange = (index, field, value) => {
    const updatedFAQs = formData.frequentlyAskedQuestions.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq,
    );
    setFormData({ ...formData, frequentlyAskedQuestions: updatedFAQs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page refresh
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.tag
    ) {
      toast('Please fill in all required fields.');
      return;
    }

    console.log('Submitting Roadmap Data:', formData); // ✅ Debugging log

    try {
      await createRoadmap(formData);
      toast('Roadmap Created Successfully!');
    } catch (error) {
      console.error('Error creating roadmap:', error);
      toast('Failed to create roadmap.');
    }
  };

  return (
    <FormContainer>
      <h2>Create Roadmap</h2>
      <form onSubmit={handleSubmit}>
        {' '}
        {/* ✅ Ensure form submission works */}
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
            value={formData.coursesIds.join(',')}
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
            value={formData.practicesIds.join(',')}
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
            value={formData.projectsIds.join(',')}
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
            value={formData.orderIds.join(',')}
            onChange={(e) =>
              setFormData({ ...formData, orderIds: e.target.value.split(',') })
            }
          />
        </FormRow>
        <FormRow>
          <Label>ُExam Id</Label>
          <Input
            type="text"
            value={formData.examId}
            onChange={(e) =>
              setFormData({ ...formData, examId: e.target.value })
            }
          />
        </FormRow>
        <FormRow>
          <Label>Certification Id</Label>
          <Input
            type="text"
            value={formData.certificationId}
            onChange={(e) =>
              setFormData({ ...formData, certificationId: e.target.value })
            }
          />
        </FormRow>
        <FormRow>
          <Label>Prerequisites (comma-separated)</Label>
          <Input
            type="text"
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
        <Button type="submit" disabled={isCreating}>
          {isCreating ? <Spinner /> : 'Create Roadmap'}
        </Button>
      </form>
    </FormContainer>
  );
}
