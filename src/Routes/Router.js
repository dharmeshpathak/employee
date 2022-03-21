import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import AddEmp from "../components/operations/AddEmp";
import Home from "../components/mainscreen/Home";
import LoginIn from "../components/auth/LoginIn";
import SignUp from "../components/auth/SignUp";
import Search from "../components/operations/Search";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "actions/userActions";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
function Router({ login, setUpLogin }) {
  const dispatch = useDispatch();
  const [user, setuser] = useState({});
  const local = localStorage.length;
  const person = useSelector((state) => state.user.loggedInUser);

  console.log(person);
  console.log(user);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch, local]);
  useEffect(() => {
    setuser(person);
  }, [person]);

  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
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
        </Route>

        <Route
          path="/login"
          element={<LoginIn login={login} setUpLogin={setUpLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUp login={login} setUpLogin={setUpLogin} />}
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default Router;
