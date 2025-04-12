import { useRightClickContext } from "../context/RightClickContext";

const useRightClick = (options) => {
  const { showMenu, hideMenu } = useRightClickContext();

  const handleContextMenu = (e) => {
    e.preventDefault();
    showMenu(e.pageX, e.pageY, options);
  };

  return { handleContextMenu, hideMenu };
};

export default useRightClick;
