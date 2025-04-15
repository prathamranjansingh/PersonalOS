import { useSystem } from "../../context/SystemContext"; 
import Button from "../base/Button"; 

const menuAppleItems = [
  { label: "About This Mac" },
  { label: null },
  { label: "System Preferences..." },
  { label: "App Store..." },
  { label: null },
  { label: "Recent Items" },
  { label: null },
  { label: "Force Quit..." },
  { label: null },
  { label: "Sleep", page: "SLEEP" },
  { label: "Restart...", page: "BOOT_RESTART" },
  { label: "Shut Down...", page: "BOOT_SHUT_DOWN" },
  { label: null },
  { label: "Lock Screen", page: "LOGIN" },
  { label: "Log Out Milleus...", page: "LOGIN" },
];

const MenuApple = () => {
  const { updateSystem } = useSystem();

  const handleItemClick = (event) => {
    const page = event.currentTarget.getAttribute("data-id");

    if (page) {
      updateSystem({ activePage: page, isAudioPlaying: false });
    }
  };

  return (
    <ul className="absolute top-6 left-0 w-60 bg-gray-200/90 backdrop-blur-lg p-1 mt-px rounded shadow-md dark:bg-gray-700/90">
      {menuAppleItems.map((item, index) => (
        <li key={`menu-apple-${index}`}>
          {item.label ? (
            <Button
              appearance="MENU_ITEM"
              dataId={item.page}
              onClick={handleItemClick}
            >
              {item.label}
            </Button>
          ) : (
            <hr className="border-gray-400 mx-2.5 my-1 dark:border-gray-500" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuApple;
