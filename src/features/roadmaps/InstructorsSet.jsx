import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { HiOutlineUsers } from 'react-icons/hi2';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  gap: 5px;
`;

const Instructor = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  font-size: 16px;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Avatar = styled.img`
  display: block;
  width: ${(props) => props.size || '4rem'};
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const Button = styled.button`
  color: #3131ff;
  margin: 1.6rem 0 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 6px 0;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function InstructorsSet({ instructor }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/profile?username=${instructor?.user?.userName}`);
  };

  return (
    <Container>
      <div style={{ display: 'flex', fontSize: '1.6rem', fontWeight: 'bold' }}>
        <HiOutlineUsers
          style={{ fontSize: '2rem', fontWeight: 'bold', marginRight: '5px' }}
        />
        <p>INSTRUCTORS</p>
      </div>
      <Instructor onClick={handleButtonClick}>
        <Avatar
          src={instructor?.user?.image || '../../../public/default-user.png'}
          alt={`${instructor?.user?.personalInformation?.name?.first
            ?.at(0)
            ?.toUpperCase()}${instructor?.user?.personalInformation?.name?.last
            ?.at(0)
            ?.toUpperCase()}`}
          size="2.5rem"
        />
        <p>{instructor?.user?.userName}</p>
      </Instructor>
      <Button>See All Instructors</Button>
    </Container>
  );
}

export default InstructorsSet;
