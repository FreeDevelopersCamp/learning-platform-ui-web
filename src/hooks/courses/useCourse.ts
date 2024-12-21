import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Course from '../../services/courses/course';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');
const defaultHeaders = {
  Authorization: `Bearer ${token}`,
  'x-tenant-id': process.env.REACT_APP_X_TENANT_ID || '',
};

// Fetch a course by ID
export function useFetchCourseById(courseId: string) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () =>
      Course.getCourse().request({
        path: `/course/${courseId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!courseId,
    onError: () => toast.error('Failed to fetch course data'),
  });
}

// Fetch courses by instructor ID
export function useFetchCoursesByInstructorId(instructorId: string) {
  return useQuery({
    queryKey: ['coursesByInstructor', instructorId],
    queryFn: () =>
      Course.getCourse().request({
        path: `/course/courseByInstructor/${instructorId}`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    enabled: !!instructorId,
    onError: () => toast.error('Failed to fetch courses by instructor'),
  });
}

// Fetch all courses
export function useFetchCourseList() {
  return useQuery({
    queryKey: ['courseList'],
    queryFn: () =>
      Course.getCourse().request({
        path: `/course`,
        method: 'GET',
        secure: true,
        headers: defaultHeaders,
      }),
    onError: () => toast.error('Failed to fetch course list'),
  });
}

// Create a course
export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCourse: Record<string, any>) =>
      Course.getCourse().request({
        path: '/course',
        method: 'POST',
        body: newCourse,
        secure: true,
        headers: defaultHeaders,
      }),
    onSuccess: () => {
      toast.success('Course created successfully');
      queryClient.invalidateQueries(['courseList']);
    },
    onError: () => toast.error('Failed to create course'),
  });
}

// Update a course
export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedCourse: Record<string, any>) =>
      Course.getCourse().request({
        path: '/course',
        method: 'PATCH',
        body: updatedCourse,
        secure: true,
        headers: defaultHeaders,
      }),
    onSuccess: () => {
      toast.success('Course updated successfully');
      queryClient.invalidateQueries(['course']);
      queryClient.invalidateQueries(['courseList']);
    },
    onError: () => toast.error('Failed to update course'),
  });
}

// Delete a course
export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      Course.getCourse().request({
        path: `/course/${id}`,
        method: 'DELETE',
        secure: true,
        headers: defaultHeaders,
      }),
    onSuccess: () => {
      toast.success('Course deleted successfully');
      queryClient.invalidateQueries(['courseList']);
    },
    onError: () => toast.error('Failed to delete course'),
  });
}
