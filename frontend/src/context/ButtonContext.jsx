import React, { createContext, useContext, useState } from 'react';

const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleButton = () => {
    setIsToggled((prev) => !prev);
  };

  const disableButton = () => {
    setIsEnabled(false);
  };

  const enableButton = () => {
    setIsEnabled(true);
  };

  return (
    <ButtonContext.Provider value={{ isToggled, toggleButton, isEnabled, disableButton, enableButton }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => useContext(ButtonContext);
