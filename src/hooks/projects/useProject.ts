import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Project from '../../services/projects/project';
import toast from 'react-hot-toast';

// Fetch all projects with pagination
export function useFetchProjectList(page?: number, limit?: number) {
  return useQuery({
    queryKey: ['projectList', page, limit],
    queryFn: () =>
      new Project().list({
        params: {
          page: page || 1,
          limit: limit || 10,
        },
      }),
    onError: () => toast.error('Failed to fetch project list'),
  });
}

// Fetch a project by ID
export function useFetchProjectById(projectId?: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => new Project().getById(projectId!),
    enabled: !!projectId, // Query runs only when projectId is defined
    onError: () => toast.error('Failed to fetch project data'),
  });
}

// Fetch projects by instructor ID with pagination
export function useFetchProjectsByInstructorId(
  instructorId?: string,
  page?: number,
  limit?: number,
) {
  return useQuery({
    queryKey: ['projectsByInstructor', instructorId, page, limit],
    queryFn: () =>
      new Project().listByInstructor(instructorId!, {
        params: {
          page: page || 1,
          limit: limit || 10,
        },
      }),
    enabled: !!instructorId, // Query runs only when instructorId is defined
    onError: () => toast.error('Failed to fetch projects by instructor'),
  });
}

// Create a new project
export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProject: Record<string, any>) =>
      new Project().create(newProject),
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries(['projectList']);
    },
    onError: () => toast.error('Failed to create project'),
  });
}

// Update an existing project
export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedProject: Record<string, any>) =>
      new Project().update(updatedProject),
    onSuccess: () => {
      toast.success('Project updated successfully');
      queryClient.invalidateQueries(['project']);
      queryClient.invalidateQueries(['projectList']);
    },
    onError: () => toast.error('Failed to update project'),
  });
}

// Delete a project by ID
export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => new Project().delete(projectId),
    onSuccess: () => {
      toast.success('Project deleted successfully');
      queryClient.invalidateQueries(['projectList']);
    },
    onError: () => toast.error('Failed to delete project'),
  });
}
