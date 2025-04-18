import Dock from "../components/menu/Docks";
import useRightClick from "../hooks/useRightClick";
import { useState } from "react";
import MenuBar from "../components/menu/MenuBar";
const Desktop = () => {
  const [wallpaper, setWallpaper] = useState("/img/wallpaper.png"); // Default wallpaper path
  
  const { handleContextMenu } = useRightClick([
    { label: "Refresh Desktop", onClick: () => alert("Desktop Refreshed") },
    { label: "New Folder", onClick: () => alert("Folder Created") },
    { label: "Display Settings", onClick: () => alert("Opening settings") },
    { 
      label: "Change Wallpaper", 
      onClick: () => {
        const wallpapers = [
          "/img/wallpaper1.jpg",
          "/wallpapers/mountains.jpg",
          "/wallpapers/ocean.jpg",
          "/wallpapers/forest.jpg"
        ];
        const currentIndex = wallpapers.indexOf(wallpaper);
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        setWallpaper(wallpapers[nextIndex]);
      }
    },
  ]);

  const dockItems = [
    {
      id: 1,
      icon: "/icons/Finder.png",
      label: "Finder",
      onClick: () => alert("Opening Finder"),
    },
    {
      id: 2,
      icon: "/icons/Terminal.png",
      label: "Terminal",
      onClick: () => alert("Opening Notes"),
    },
    {
      id: 3,
      icon: "/icons/Settings.png",
      label: "Settings",
      onClick: () => alert("Opening Settings"),
    },
    {
      id: 4,
      icon: "/icons/Safari.png",
      label: "Safari",
      onClick: () => alert("Opening Music"),
    },
  ];

  return (
    <div
      onContextMenu={handleContextMenu}
      className="w-screen h-screen overflow-hidden text-white flex flex-col justify-between relative"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      
      {/* Content with higher z-index to appear above the wallpaper */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <MenuBar/>
      </div>

      <div className="relative z-10 w-full py-4 flex justify-center">
        <Dock items={dockItems} />
      </div>
    </div>
  );
};

export default Desktop;