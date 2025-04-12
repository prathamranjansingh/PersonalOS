import { useEffect } from "react";
import { useRightClickContext } from "../context/RightClickContext";

const RightClickMenu = () => {
  const { menuData, hideMenu } = useRightClickContext();

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
      className="absolute bg-gray-800 text-white rounded shadow-lg z-50 py-2 w-44"
      style={{ top: menuData.y, left: menuData.x }}
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
