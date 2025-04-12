import useRightClick from "../hooks/useRightClick";

const Login = ({ onLogin }) => {
  const { handleContextMenu } = useRightClick([
    { label: "Refresh", onClick: () => alert("Refreshed") },
    { label: "Help", onClick: () => alert("Help Clicked") },
  ]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className="w-screen h-screen bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Welcome to My OS</h1>
      <button
        onClick={onLogin}
        className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
