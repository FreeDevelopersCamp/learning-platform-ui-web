import React, { createContext, useContext, useState } from 'react';

const PracticesContext = createContext();

export function useCount() {
  return useContext(PracticesContext);
}

export function PracticesProvider({ children }) {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((prevCount) => prevCount + 1);
  const decrementCount = () => setCount((prevCount) => prevCount - 1);

  return (
    <PracticesContext.Provider
      value={{ count, incrementCount, decrementCount }}
    >
      {children}
    </PracticesContext.Provider>
  );
}
