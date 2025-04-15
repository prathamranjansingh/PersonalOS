import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeMenuId, setActiveMenuId] = useState("none");
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [activeTitle, setActiveTitle] = useState("Desktop");
  const [date, setDate] = useState(new Date());

  const value = {
    activeMenuId,
    setActiveMenuId,
    isWifiOn,
    setIsWifiOn,
    activeTitle,
    setActiveTitle,
    date,
    setDate,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
