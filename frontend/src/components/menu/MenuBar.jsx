import React, { useRef } from 'react';
import { BsApple, BsToggles } from "react-icons/bs";
import { MdSearch, MdWifi, MdWifiOff } from "react-icons/md";
import format from "date-fns/format";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useMenuContext } from "../../context/MenuBar"; 
import BatteryIcon from "./BatteryIcon";
import Button, { ButtonAppearance } from "../base/Button";
import MenuApple from "./MenuApple";
import MenuWifi from "./MenuWifi";

export const MENU_BAR_HEIGHT_REM = 1.5;

const MenuId = {
  NONE: "none",
  APPLE: "apple",
  WIFI: "wifi",
  SPOTLIGHT: "spotlight",
  CONTROL_CENTER: "control-center",
};

const MenuBar = () => {
  const {
    date,
    isWifiOn,
    activeTitle,
    activeMenuId,
    setActiveMenuId,
  } = useMenuContext();

  const menuAppleRef = useRef(null);
  const menuWifiRef = useRef(null);
  const menuControlCenterRef = useRef(null);

  const handleItemClick = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    const newId = id === activeMenuId ? MenuId.NONE : id;
    if (newId) {
      setActiveMenuId(newId);
    }
  };

  let ref;

  switch (activeMenuId) {
    case MenuId.APPLE:
      ref = menuAppleRef;
      break;
    case MenuId.WIFI:
      ref = menuWifiRef;
      break;
    case MenuId.CONTROL_CENTER:
      ref = menuControlCenterRef;
      break;
    default:
      ref = null;
  }

  useOutsideClick(ref, () => setActiveMenuId(MenuId.NONE));

  return (
    <div
      className="absolute z-50 top-0 w-full flex justify-between items-stretch bg-gray-400/40 px-1.5"
      style={{ height: `${MENU_BAR_HEIGHT_REM}rem` }}
    >
      <div className="flex">
        <div className="flex relative" ref={menuAppleRef}>
          <Button
            ariaLabel="apple menu"
            appearance={ButtonAppearance.MENU_BAR}
            isToggled={activeMenuId === MenuId.APPLE}
            dataId={MenuId.APPLE}
            onClick={handleItemClick}
          >
            <BsApple className="w-4 h-4 mx-1" />
          </Button>
          {activeMenuId === MenuId.APPLE && <MenuApple />}
        </div>

        <Button appearance={ButtonAppearance.MENU_BAR}>
          <span className="font-bold mx-1">{activeTitle}</span>
        </Button>
      </div>

      {/* Right section */}
      <div className="flex">
        <Button
          ariaLabel="battery status"
          appearance={ButtonAppearance.MENU_BAR}
        >
          <BatteryIcon isValueVisible={true} />
        </Button>

        <div className="flex relative" ref={menuWifiRef}>
          <Button
            ariaLabel="wifi menu"
            appearance={ButtonAppearance.MENU_BAR}
            isToggled={activeMenuId === MenuId.WIFI}
            dataId={MenuId.WIFI}
            onClick={handleItemClick}
          >
            {isWifiOn ? (
              <MdWifi className="w-4.5 h-4.5" />
            ) : (
              <MdWifiOff className="w-4.5 h-4.5" />
            )}
          </Button>
          {activeMenuId === MenuId.WIFI && <MenuWifi />}
        </div>

        <Button
          ariaLabel="spotlight"
          appearance={ButtonAppearance.MENU_BAR}
          isToggled={false}
          dataId={MenuId.SPOTLIGHT}
          onClick={handleItemClick}
        >
          <MdSearch className="w-4.5 h-4.5 mx-1" />
        </Button>

        <div className="flex" ref={menuControlCenterRef}>
          <Button
            ariaLabel="control center menu"
            appearance={ButtonAppearance.MENU_BAR}
            isToggled={activeMenuId === MenuId.CONTROL_CENTER}
            dataId={MenuId.CONTROL_CENTER}
            onClick={handleItemClick}
          >
            <BsToggles className="w-3.5 h-3.5" />
          </Button>
          {activeMenuId === MenuId.CONTROL_CENTER && <MenuControlCenter />}
        </div>

        <Button appearance={ButtonAppearance.MENU_BAR}>
          <span className="mx-1">{format(new Date(date), "eee d MMM")}</span>
          <span className="min-w-0 w-16 mr-1">
            {format(new Date(date), "h:mm aa")}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
