import React, { createContext, useContext, useState } from 'react';

const CoursesContext = createContext();

export function useCount() {
  return useContext(CoursesContext);
}

export function CoursesProvider({ children }) {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((prevCount) => prevCount + 1);
  const decrementCount = () => setCount((prevCount) => prevCount - 1);

  return (
    <CoursesContext.Provider value={{ count, incrementCount, decrementCount }}>
      {children}
    </CoursesContext.Provider>
  );
}
