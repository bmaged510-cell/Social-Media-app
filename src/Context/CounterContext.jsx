import { createContext, useState } from "react";

export const CounterContext = createContext();

export default function CounterContextProvider({ children }) {
  const [counter, setcounter] = useState(10);

  return (
    <CounterContext.Provider value={{ counter, setcounter }}>
      {children}
    </CounterContext.Provider>
  );
}