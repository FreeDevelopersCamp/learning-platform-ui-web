import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Roadmap from '../../services/roadmaps/roadmap';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');
const defaultHeaders = {
  Authorization: `Bearer ${token}`,
  'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
};

// Fetch roadmap by ID
export function useFetchRoadmapById(roadmapId) {
  return useQuery({
    queryKey: ['roadmap', roadmapId],
    queryFn: () =>
      Roadmap?.getroadmap()?.request({
        path: `/roadmap/${roadmapId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!roadmapId,
    onError: () => toast.error('Failed to fetch roadmap data'),
  });
}

// Fetch roadmaps by instructor ID
export function useFetchRoadmapsByInstructorId(instructorId) {
  return useQuery({
    queryKey: ['roadmapByInstructor', instructorId],
    queryFn: () =>
      Roadmap?.getroadmap()?.request({
        path: `/roadmap/roadmapByInstructor/${instructorId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!instructorId,
    onError: () => toast.error('Failed to fetch roadmaps by instructor'),
  });
}

// Fetch all roadmaps
export function useFetchRoadmapList() {
  return useQuery({
    queryKey: ['roadmapList'],
    queryFn: () =>
      Roadmap.getroadmap().request({
        path: `/roadmap`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    onError: () => toast.error('Failed to fetch roadmap list'),
  });
}

// Create roadmap
export function useCreateRoadmap() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newRoadmap) =>
      Roadmap.getroadmap().request({
        path: '/roadmap',
        method: 'POST',
        body: newRoadmap,
        secure: true,
        headers: defaultHeaders,
      }),
    onSuccess: () => {
      toast.success('Roadmap created successfully');
      queryClient.invalidateQueries(['roadmapList']);
    },
    onError: () => toast.error('Failed to create roadmap'),
  });
}

// Update roadmap
export function useUpdateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedRoadmap: Record<string, any>) =>
      Roadmap?.getroadmap()?.request({
        path: '/roadmap',
        method: 'PATCH',
        body: updatedRoadmap,
        secure: true,
        headers: defaultHeaders,
      }),
    onSuccess: () => {
      toast.success('Roadmap updated successfully');
      queryClient.invalidateQueries(['roadmap']);
      queryClient.invalidateQueries(['roadmapList']);
    },
    onError: () => toast.error('Failed to update roadmap'),
  });
}

// Delete roadmap
export function useDeleteRoadmap() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      Roadmap?.getroadmap().request({
        path: `/roadmap/${id}`,
        method: 'DELETE',
        secure: true,
        headers: defaultHeaders,
      }),
    onSuccess: () => {
      toast.success('Roadmap deleted successfully');
      queryClient.invalidateQueries(['roadmapList']);
    },
    onError: () => toast.error('Failed to delete roadmap'),
  });
}
