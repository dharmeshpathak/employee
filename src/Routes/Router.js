import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import AddEmp from "../components/operations/AddEmp";
import Home from "../components/mainscreen/Home";
import LoginIn from "../components/auth/LoginIn";
import SignUp from "../components/auth/SignUp";
import Search from "../components/operations/Search";

function Router({ login, setUpLogin }) {
  return (
    <div>
      <Routes>
        {localStorage.getItem("userItem") === null ? (
          <Route exact path="/" element={<Navigate replace to="/login" />} />
        ) : (
          ""
        )}
        {localStorage.getItem("userItem") === null ? (
          <Route
            exact
            path="/addemployee"
            element={<Navigate replace to="/login" />}
          />
        ) : (
          ""
        )}
        {localStorage.getItem("userItem") === null ? (
          <Route
            exact
            path="/Search"
            element={<Navigate replace to="/login" />}
          />
        ) : (
          ""
        )}
      
        {localStorage.getItem("userItem") === null ? (
          <Route exact path="/" element={<Navigate replace to="/login" />} />
        ) : (
          ""
        )}
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
          path="/login"
          element={<LoginIn login={login} setUpLogin={setUpLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUp login={login} setUpLogin={setUpLogin} />}
        />
      </Routes>
    </div>
  );
}

export default Router;
