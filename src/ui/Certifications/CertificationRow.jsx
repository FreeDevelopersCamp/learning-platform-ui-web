import styled from 'styled-components';
import Table from '../Tables/Table.jsx';
import { useNavigate } from 'react-router-dom';

const StyledName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 3rem;
`;

const StyledLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 1.6rem;

  &:hover {
    color: #2b6cb0;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  width: 200px;
  height: 150px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  object-fit: cover;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

function CertificationRow({ dump }) {
  const navigate = useNavigate();

  return (
    <Table.Row>
      {dump === 'Yes' ? (
        <>
          <StyledName className="flex gap-4">
            <div className="flex flex-col gap-2 align-center justify-center">
              <span>Front-End Beginner Certificate</span>
              <StyledLink href="https://storage.googleapis.com/free-developers-camp-images/uploads/bara.png">
                View Certificate
              </StyledLink>
              <StyledLink onClick={() => navigate('/profile?username=baraa')}>
                View Profile
              </StyledLink>
            </div>
          </StyledName>
          <StyledImage
            src="https://storage.googleapis.com/free-developers-camp-images/uploads/bara.png"
            alt="Front-End Beginner Certificate"
          />
        </>
      ) : (
        <div className="flex gap-4">
          Complete new roadmap to gain new certificates
        </div>
      )}
    </Table.Row>
  );
}

export default CertificationRow;
