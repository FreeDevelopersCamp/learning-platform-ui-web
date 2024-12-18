import { useQuery } from '@tanstack/react-query';
import Admin from '../../services/users/admin';
import Owner from '../../services/users/owner';
import Manager from '../../services/users/manager';
import AccountManager from '../../services/users/accountManager';
import ContentManager from '../../services/users/contentManager';
import Instructor from '../../services/users/instructor';
import Learner from '../../services/users/learner';
import toast from 'react-hot-toast';

// Generic hook for fetching user data by role
function useRoleData(roleKey, serviceInstance, userId) {
  return useQuery({
    queryKey: [roleKey, userId],
    queryFn: () => serviceInstance.getByUserId(userId),
    onError: () => toast.error(`Failed to fetch data for role: ${roleKey}`),
  });
}

export const getServiceInstanceByRole = (role) => {
  switch (role) {
    case '0':
      return Admin.getInstance();
    case '1':
      return Owner.getInstance();
    case '2':
      return Manager.getInstance();
    case '3':
      return AccountManager.getInstance();
    case '4':
      return ContentManager.getInstance();
    case '5':
      return Instructor.getInstance();
    case '6':
      return Learner.getInstance();
    default:
      console.error(`Unknown role: ${role}`);
      return null;
  }
};

// Specific hooks for each role
export function useAdmin(userId) {
  return useRoleData(['admin'], Admin.getInstance(), userId);
}

export function useOwner(userId) {
  return useRoleData(['owner'], Owner.getInstance(), userId);
}

export function useManager(userId) {
  return useRoleData(['manager'], Manager.getInstance(), userId);
}

export function useAccountManager(userId) {
  return useRoleData(['account-manager'], AccountManager.getInstance(), userId);
}

export function useContentManager(userId) {
  return useRoleData(['content-manager'], ContentManager.getInstance(), userId);
}

export function useInstructor(userId) {
  return useRoleData(['instructor'], Instructor.getInstance(), userId);
}

export function useLearner(userId) {
  return useRoleData(['learner'], Learner.getInstance(), userId);
}
