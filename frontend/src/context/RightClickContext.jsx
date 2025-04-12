import { createContext, useContext, useState } from "react";

const RightClickContext = createContext();

export const RightClickProvider = ({ children }) => {
  const [menuData, setMenuData] = useState({ visible: false, x: 0, y: 0, options: [] });

  const showMenu = (x, y, options) => {
    setMenuData({ visible: true, x, y, options });
  };

  const hideMenu = () => {
    setMenuData({ ...menuData, visible: false });
  };

  return (
    <RightClickContext.Provider value={{ menuData, showMenu, hideMenu }}>
      {children}
    </RightClickContext.Provider>
  );
};

export const useRightClickContext = () => useContext(RightClickContext);
