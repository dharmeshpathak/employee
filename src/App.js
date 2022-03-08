import { useEffect, useState } from "react";

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import NewNavbar from "./components/Navbar/NewNavbar";
function App() {
  const [login, setLogin] = useState(false);
  const setUpLogin = async () => {
    const user = await localStorage.getItem("userItem");
    if (user === null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  useEffect(() => {
    setUpLogin();
  });
  return (
    <div>
      <BrowserRouter>
        <NewNavbar login={login} setUpLogin={setUpLogin} />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
