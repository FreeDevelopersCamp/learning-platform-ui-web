import React, { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

export function useCount() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({ children }) {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((prevCount) => prevCount + 1);
  const decrementCount = () => setCount((prevCount) => prevCount - 1);

  return (
    <ProjectsContext.Provider value={{ count, incrementCount, decrementCount }}>
      {children}
    </ProjectsContext.Provider>
  );
}
