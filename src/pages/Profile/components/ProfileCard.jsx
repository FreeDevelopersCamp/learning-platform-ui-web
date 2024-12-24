import styled from 'styled-components';

const ProfileCard = ({ user }) => {
  return (
    <Card>
      <ProfileImage src={user.image} alt={user.name} />
      <ProfileInfo>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </ProfileInfo>
    </Card>
  );
};

const Card = styled.div`
  /* Add your styling here using TailwindCSS classes */
`;

const ProfileImage = styled.img`
  /* Add your styling here using TailwindCSS classes */
`;

const ProfileInfo = styled.div`
  /* Add your styling here using TailwindCSS classes */
`;

export default ProfileCard;
