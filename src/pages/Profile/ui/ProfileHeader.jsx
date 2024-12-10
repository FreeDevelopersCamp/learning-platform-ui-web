import styled from 'styled-components';

import UserAvatar from './../../../features/authentication/UserAvatar';
import { getRoleCode } from '../../../utils/helpers';

const HeaderCover = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 40rem;
  color: white;
  background: linear-gradient(to bottom, #4a90e2, #003a70);
  border-radius: 1rem;
  width: 60%; /* Centers the container with respect to the viewport */
`;

const VSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 40rem;
  color: white;
  border-radius: 1rem;
  width: 100%; /* Centers the container with respect to the viewport */
`;

const HSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  text-align: left;
  justify-content: center;
  width: 100%;
  padding-bottom: 4rem;
`;

const HeadlineText = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: white; /* Custom color for the headline */
  font-family: 'Poppins', sans-serif;
`;

const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  margin-top: 1.5rem;
`;

const AccountItem = styled.a`
  font-size: 1.8rem;
  margin-top: 0.6rem;
  color: var(--color-grey-300);

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderSubtitle = styled.h2`
  font-size: 1.8rem;
  margin-top: 0.2rem;
  font-weight: 400;
  color: var(--color-grey-100);
`;

const UserRoles = styled.h2`
  font-size: 1.8rem;
  margin-top: 0.2rem;
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

function ProfileHeader({ user, accounts, headline, state, position }) {
  return (
    <HeaderCover>
      <VSection>
        <ImageSection>
          <UserAvatar user={user} size="11rem" />
          <HeaderTitle>{`${user.personalInformation?.name?.first} ${user.personalInformation?.name?.last}`}</HeaderTitle>
          <UserRoles>
            {user.roles.map((role) => getRoleCode(role)).join(', ')}
          </UserRoles>
          <HeaderSubtitle>
            {position} | {state}
          </HeaderSubtitle>
        </ImageSection>
        <TechSection>
          <HeaderTitle>Accounts</HeaderTitle>
          {accounts.map((account) => (
            <AccountItem key={account.name} href={`${account.url}`}>
              {account.name}
            </AccountItem>
          ))}
        </TechSection>
      </VSection>
      <HSection>
        <HeadlineText>{headline}</HeadlineText>
      </HSection>
    </HeaderCover>
  );
}

export default ProfileHeader;
