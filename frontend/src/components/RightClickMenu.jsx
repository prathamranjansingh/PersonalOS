import { useEffect, useState } from "react";
import { useRightClickContext } from "../context/RightClickContext";

const RightClickMenu = () => {
  const { menuData, hideMenu } = useRightClickContext();
  const [adjustedPosition, setAdjustedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (menuData.visible) {
      const menuWidth = 180;
      const menuHeight = menuData.options.length * 40;

      let x = menuData.x;
      let y = menuData.y;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Adjust horizontal position if overflowing right
      if (x + menuWidth > screenWidth) {
        x = screenWidth - menuWidth - 10;
      }

      // Adjust vertical position if overflowing bottom
      if (y + menuHeight > screenHeight) {
        y = screenHeight - menuHeight - 10;
      }

      setAdjustedPosition({ x, y });
    }
  }, [menuData]);

  useEffect(() => {
    const handleClickOutside = () => {
      hideMenu();
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [hideMenu]);

  if (!menuData.visible) return null;

  return (
    <ul
      className="fixed bg-gray-800 text-white rounded shadow-lg z-50 py-2 w-44 select-none"
      style={{ top: adjustedPosition.y, left: adjustedPosition.x }}
    >
      {menuData.options.map((opt, idx) => (
        <li
          key={idx}
          onClick={() => {
            opt.onClick();
            hideMenu();
          }}
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
        >
          {opt.label}
        </li>
      ))}
    </ul>
  );
};

export default RightClickMenu;
