import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  color: var(--color-grey-700);
`;

const CertificationCards = styled.div`
  display: ${(props) =>
    props.itemsNumber && props.itemsNumber < 2 ? 'flex' : 'grid'};
  grid-template-columns: ${(props) =>
    props.itemsNumber && props.itemsNumber >= 2 ? '1fr 1fr' : 'none'};
  gap: 4rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const CertificationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.1rem;
  width: 50rem;
  padding: 3rem 2rem;

  text-align: left;
  background-color: var(--color-coolgray-100);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);

  h1 {
    font-size: 2rem;
    color: var(--color-grey-700);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.6rem;
    color: var(--color-grey-600);
    font-weight: 500;
    margin-bottom: 1rem;
  }

  a {
    font-size: 1.4rem;
    color: var(--color-skyblue-600);
    text-decoration: underline;
    margin-bottom: 1rem;

    &:hover {
      color: var(--color-skyblue-700);
    }
  }

  span {
    font-size: 1.4rem;
    color: var(--color-grey-500);
  }
`;

function ProfileCertifications({ certifications }) {
  return (
    <StyledContainer>
      <Title>My Certifications</Title>
      <p>
        {certifications.subtitle || 'You have not added certifications yet.'}
      </p>
      <CertificationCards
        itemsNumber={certifications?.otherCertifications?.length}
      >
        {certifications?.otherCertifications?.map((cert) => (
          <CertificationItem key={`${cert.name}-${cert.institution}`}>
            <h1>{cert.name}</h1>
            <p>
              Institution: {cert.institution} | {cert.date}
            </p>
            {cert.url && (
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                View Certification
              </a>
            )}
          </CertificationItem>
        ))}
      </CertificationCards>
    </StyledContainer>
  );
}

export default ProfileCertifications;
