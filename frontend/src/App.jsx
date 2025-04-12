import { RightClickProvider } from "./context/RightClickContext";
import RightClickMenu from "./components/RightClickMenu";
import Login from "./pages/Login";
import Desktop from "./pages/Desktop";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <RightClickProvider>
      {loggedIn ? <Desktop /> : <Login onLogin={() => setLoggedIn(true)} />}
      <RightClickMenu />
    </RightClickProvider>
  );
}

export default App;
