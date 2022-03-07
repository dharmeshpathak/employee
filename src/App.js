import { useEffect, useState } from "react";
// import axios from 'axios'
import AddEmp from "./components/AddEmp";
import Home from "./components/Home";
import EditEmp from "./components/EditEmp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import LoginIn from "./components/LoginIn";
import SignUp from "./components/SignUp";
import Search from "./components/Search";
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
        <Navbar login={login} setUpLogin={setUpLogin} setLogin={setLogin} />
        <Routes>
          <Route
            path="/"
            element={<Home login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/addemployee"
            element={<AddEmp login={login} setUpLogin={setUpLogin} />}
          />
           <Route
            path="/search"
            element={<Search login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/update/:id"
            element={<EditEmp login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/login"
            element={<LoginIn login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUp login={login} setUpLogin={setUpLogin} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
