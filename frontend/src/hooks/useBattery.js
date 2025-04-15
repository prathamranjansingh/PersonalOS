import { useEffect, useState } from "react";

const nav = typeof navigator !== "undefined" ? navigator : undefined;
const isBatteryApiSupported = nav && typeof nav.getBattery === "function";

// Mock version of the useBattery hook when Battery API is not supported
const useBatteryMock = () => {
  return { isSupported: false };
};

// Real version of the useBattery hook when Battery API is supported
const useBatteryReal = () => {
  const [state, setState] = useState({
    isSupported: true,
    fetched: false,
  });

  useEffect(() => {
    let isMounted = true;
    let battery = null;

    const handleChange = () => {
      if (!isMounted || !battery) {
        return;
      }

      setState({
        isSupported: true,
        fetched: true,
        level: battery.level,
        charging: battery.charging,
        dischargingTime: battery.dischargingTime,
        chargingTime: battery.chargingTime,
      });
    };

    nav.getBattery().then((bat) => {
      if (!isMounted) {
        return;
      }

      battery = bat;
      battery.addEventListener("chargingchange", handleChange);
      battery.addEventListener("chargingtimechange", handleChange);
      battery.addEventListener("dischargingtimechange", handleChange);
      battery.addEventListener("levelchange", handleChange);
      handleChange();
    });

    return () => {
      isMounted = false;

      if (battery) {
        battery.removeEventListener("chargingchange", handleChange);
        battery.removeEventListener("chargingtimechange", handleChange);
        battery.removeEventListener("dischargingtimechange", handleChange);
        battery.removeEventListener("levelchange", handleChange);
      }
    };
  }, []);

  return state;
};

// Final hook export that conditionally uses the mock or real hook
export const useBattery = isBatteryApiSupported ? useBatteryReal : useBatteryMock;
