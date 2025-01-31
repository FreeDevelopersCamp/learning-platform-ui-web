import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useGetProfile } from '@/apis/core/Profile/hooks/useGetProfile.ts';

import ProfileHeader from './components/ProfileHeader';
import ProfileWork from './components/ProfileWork';
import ProfileCertifications from './components/ProfileCertifications';
import ProfileCourses from './components/ProfileCourses';
import ProfileWorkExperience from './components/ProfileWorkExperience';
import ProfileEducation from './components/ProfileEducation';
import ProfileAbout from './components/ProfileAbout';
import ProfileFooter from './components/ProfileFooter';
import Spinner from '../../ui/Spinner';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useGetDetails } from '../../apis/learn/Progress/hooks/useGetDetails';
import ProfileProjects from './components/ProfileProjects';
import ProfileRoadmaps from './components/ProfileRoadmaps';

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username') || '';

  const { profile, profileLoading } = useGetProfile(username);
  const { user, userLoading } = useGetUser(username);
  const { progress, isLoading: progressLoading } = useGetDetails(user?._id);

  if (profileLoading || progressLoading || userLoading) return <Spinner />;

  return (
    <ProfilePageContainer>
      <ProfileHeader
        user={profile.user}
        accounts={profile.accounts}
        headline={profile.headline}
        state={profile.state}
        position={profile.position}
      />
      <ProfileAbout about={profile.about} />
      <ProfileWork work={profile.work} />
      <ProfileCertifications certifications={profile.certifications} />
      <ProfileCourses progress={progress} />
      <ProfileProjects progress={progress} />
      <ProfileRoadmaps progress={progress} />
      <ProfileWorkExperience experience={profile.experience} />
      <ProfileEducation education={profile.education} />
      <ProfileFooter />
    </ProfilePageContainer>
  );
};

export default ProfilePage;
