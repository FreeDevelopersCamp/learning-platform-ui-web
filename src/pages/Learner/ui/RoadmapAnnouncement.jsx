import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TrackCard = styled.div`
  margin-top: 2rem;
  background-color: #f7f7fc;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  transition: all 0.3s ease; /* Smooth transitions for all properties */
  cursor: pointer;
  height: 12rem;

  &:hover {
    background-color: white; /* Tailwind's bg-gray-100 */
  }

  &:active {
    background-color: #f7f7fc; /* Tailwind's bg-gray-200 */
  }
`;

const Badge = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  display: inline-block;

  &.track {
    color: #4b5563; /* Tailwind's text-gray-600 */
    border: 1px solid #d1d5db; /* Tailwind's border-gray-300 */
  }

  &.new {
    color: #92400e; /* Tailwind's text-yellow-800 */
    background-color: #fef3c7; /* Tailwind's bg-yellow-200 */
  }
`;

const Title = styled.h3`
  font-size: 1.7rem; /* Tailwind's text-lg */
  font-weight: 600; /* Tailwind's font-semibold */
  color: #1f2937; /* Tailwind's text-gray-800 */
`;

const Hours = styled.p`
  font-size: 1.2rem; /* Tailwind's text-sm */
  font-weight: 500; /* Tailwind's font-medium */
`;

export default function RoadmapAnnouncement({ userProgress }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/roadmap');
  }

  return (
    <TrackCard onClick={handleClick}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Badge className="track">Roadmap</Badge>
        <Badge className="new">Coming</Badge>
      </div>
      <Title>AWS Cloud Practitioner</Title>
      <Hours>10 hours</Hours>
    </TrackCard>
  );
}
