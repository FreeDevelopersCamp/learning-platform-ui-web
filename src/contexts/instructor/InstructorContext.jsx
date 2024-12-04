import React, { createContext, useContext, useState } from 'react';

const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
  const [instructorData, setInstructorData] = useState(null);

  return (
    <InstructorContext.Provider value={{ instructorData, setInstructorData }}>
      {children}
    </InstructorContext.Provider>
  );
};

export const useInstructorData = () => useContext(InstructorContext);
