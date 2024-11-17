import React, { createContext, useContext, useState } from "react";

const OpenContext = createContext();

export const useOpenContext = () => useContext(OpenContext);

export const OpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <OpenContext.Provider value={{ isOpen, setIsOpen }}>{children}</OpenContext.Provider>;
};
