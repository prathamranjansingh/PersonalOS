import { RightClickProvider } from "./context/RightClickContext";
import RightClickMenu from "./components/RightClickMenu";
import Login from "./pages/Login";
import Desktop from "./pages/Desktop";
import { useState } from "react";
import { ButtonProvider } from "./context/ButtonContext.jsx";
import { MenuProvider } from "./context/MenuBar.jsx";
import { SystemProvider } from "./context/SystemContext.jsx";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <RightClickProvider>
      <SystemProvider>
      <MenuProvider>
      <ButtonProvider>
      {loggedIn ? <Desktop /> : <Login onLogin={() => setLoggedIn(true)} />}
      <RightClickMenu />
      </ButtonProvider>
      </MenuProvider>
      </SystemProvider>
    </RightClickProvider>
  );
}

export default App;
