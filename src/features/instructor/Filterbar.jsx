import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import Filter from './roadmaps/Filter';

const StyledFilterbar = styled.div`
  position: ${(props) => (props.isFixed ? 'fixed' : 'relative')};
  top: ${(props) => (props.isFixed ? '5.5rem' : 'auto')};
  left: ${(props) => (props.isFixed ? '51.7rem' : 'auto')};
  width: 110rem;
  max-width: 100%;
  z-index: 1000;
  transition: top 0.3s;
  padding: 0;
  border: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TotalWrapper = styled.div`
  width: 100%;
`;

const Line = styled.div`
  height: ${(props) => (props.isFixed ? '5px' : '0')};
  z-index: 1000;
  width: calc(115rem - 1.9rem);
  transform: translateX(-1.5rem);
  box-shadow: ${(props) =>
    props.isFixed ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};

  transition: all 0.1s ease-in-out;
`;

function Filterbar({ filterOptions, onFilterChange, children }) {
  const { mainRef: scrollContainer } = useOutletContext();
  const [isFixed, setIsFilterbarFixed] = useState(false);

  useEffect(() => {
    if (!scrollContainer?.current) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.current.scrollTop;
      setIsFilterbarFixed(scrollTop > 220);
    };

    const container = scrollContainer.current;
    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainer, isFixed]);

  function handleFilterChange(value) {
    onFilterChange(value);
  }

  return (
    <StyledFilterbar isFixed={isFixed}>
      <Filter
        options={filterOptions}
        filterField="topics"
        onFilterChange={handleFilterChange}
      />
      <TotalWrapper>{children}</TotalWrapper>
      <Line isFixed={isFixed} />
    </StyledFilterbar>
  );
}

export default Filterbar;
