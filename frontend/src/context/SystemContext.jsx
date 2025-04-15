import { createContext, useContext, useState } from "react";

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [system, setSystem] = useState({
    activePage: null,
    isAudioPlaying: true,
  });
  const updateSystem = (updates) => {
    setSystem((prev) => ({ ...prev, ...updates }));
  };
  const toggleWifi = () => setIsWifiOn((prev) => !prev);

  return (
    <SystemContext.Provider value={{ isWifiOn, toggleWifi }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => useContext(SystemContext);
