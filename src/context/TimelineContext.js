import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [timeline, setTimeline] = useState([]);

  const addEntry = (entry) => {
    setTimeline([...timeline, entry]);
  };

  return (
    <TimelineContext.Provider value={{ timeline, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}