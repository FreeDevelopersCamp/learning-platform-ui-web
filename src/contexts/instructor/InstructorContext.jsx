import React, { createContext, useContext, useState, useEffect } from 'react';

const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
  const [instructorData, setInstructorData] = useState(() => {
    const storedData = localStorage.getItem('instructorData');
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if (instructorData) {
      localStorage.setItem('instructorData', JSON.stringify(instructorData));
    } else {
      localStorage.removeItem('instructorData');
    }
  }, [instructorData]);

  return (
    <InstructorContext.Provider value={{ instructorData, setInstructorData }}>
      {children}
    </InstructorContext.Provider>
  );
};

export const useInstructorData = () => useContext(InstructorContext);
