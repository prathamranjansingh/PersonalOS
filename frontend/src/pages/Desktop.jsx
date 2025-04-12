import useRightClick from "../hooks/useRightClick";

const Desktop = () => {
  const { handleContextMenu } = useRightClick([
    { label: "Refresh Desktop", onClick: () => alert("Desktop Refreshed") },
    { label: "New Folder", onClick: () => alert("Folder Created") },
    { label: "Display Settings", onClick: () => alert("Opening settings") },
  ]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className="w-screen h-screen bg-slate-700 text-white flex items-center justify-center"
    >
      <h1 className="text-4xl">Desktop Screen</h1>
    </div>
  );
};

export default Desktop;
