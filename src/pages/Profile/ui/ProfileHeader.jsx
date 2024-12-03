import styled from 'styled-components';
import UserAvatar from './../../../features/authentication/UserAvatar';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../../../hooks/users/useUser';
import Spinner from '../../../ui/Spinner';

const HeaderCover = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4rem auto;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 40rem;
  color: white;
  background: linear-gradient(to bottom, #4a90e2, #003a70);
  border-radius: 1rem;
  width: 60%; /* Centers the container with respect to the viewport */
`;

const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  margin-top: 1.5rem;
`;

const HeaderSubtitle = styled.h2`
  font-size: 1.6rem;
  margin-top: 0.5rem;
  color: var(--color-grey-300);
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  justify-content: start;
  width: 100%;
  padding-left: 3rem;
  padding-top: 5rem;
`;

const TechSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  text-align: right;
  justify-content: start;
  width: 100%;
  padding-right: 3rem;
  padding-top: 5rem;
`;

const HeadlineText = styled.h1`
  font-size: 2.4rem;
  line-height: 1.6;
  font-weight: bold;
  color: #4a90e2; /* Custom color for the headline */
`;

function ProfileHeader() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const { user, isLoading: userLoading } = useUser(username);

  const text = 'Keep coding until the impossible becomes possible.';

  if (userLoading) return <Spinner />;

  return (
    <HeaderCover>
      <ImageSection>
        <UserAvatar user={user} size="11rem" />
        <HeaderTitle>{`${user.personalInformation?.name?.first} ${user.personalInformation?.name?.last}`}</HeaderTitle>
        <HeaderSubtitle>Admin</HeaderSubtitle>
        <HeaderSubtitle>
          An-Najah National University | Palestine
        </HeaderSubtitle>
      </ImageSection>

      <TechSection>
        <HeaderTitle>Accounts</HeaderTitle>
        <HeaderSubtitle>Facebook</HeaderSubtitle>
        <HeaderSubtitle>Instagram</HeaderSubtitle>
        <HeaderSubtitle>Linkedin</HeaderSubtitle>
        <HeaderSubtitle>GitHub</HeaderSubtitle>
      </TechSection>
    </HeaderCover>
  );
}

export default ProfileHeader;
