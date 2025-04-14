import { useState, useEffect } from "react";
import useRightClick from "../hooks/useRightClick";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const { handleContextMenu } = useRightClick([
    { label: "Refresh", onClick: () => window.location.reload() },
    { label: "About", onClick: () => alert("macOS Clone v1.0") },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options = { weekday: "long", day: "numeric", month: "long" };
      const formattedDate = now.toLocaleDateString("en-US", options);
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setDateTime({
        date: formattedDate,
        time: formattedTime,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password); // Call even if password is empty
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className="w-screen h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/img/wallpaper.png')",
      }}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Date and Time */}
      <div className="absolute top-10 w-full flex justify-center items-center z-10 text-white text-center">
        <div>
          <div className="text-xl font-medium">{dateTime.date}</div>
          <div className="text-7xl font-bold">{dateTime.time}</div>
        </div>
      </div>

      {/* Login panel */}
      <div className="relative z-10 w-full h-full flex items-end justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mb-14"
        >
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Avatar"
            className="w-16 h-16 mb-6 rounded-full"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full px-4 py-1 mb-4 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
