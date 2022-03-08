import React from "react";
import { useState, useEffect } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import "../styles/inputfield.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddEmp = ({ login, setLogin }) => {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });
  const handleChange = (e) => {
    setEmployee(() => {
      return { ...employee, [e.target.name]: e.target.value };
    });
  };

  const addEmployee = async () => {
    if (
      employee.name === "" ||
      employee.email === "" ||
      employee.phone === "" ||
      employee.dob === ""
    ) {
      return;
    }

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/employees`, {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      dob: employee.dob,
    });
    if (res.status === 201) {
      console.log("Empployee Added");
      setEmployee({
        name: "",
        email: "",
        phone: "",
        dob: "",
      });
    }
  };
  useEffect(() => {
    if (!login) {
      return navigate("/login");
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  return (
    <Box
      elevation={1}
      component={Paper}
      p={4}
      display="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      maxWidth={700}
      margin={"auto"}
      mt={4}
    >
      <Typography
        variant="h4"
        component="h4"
        fontWeight={700}
        m={3}
        textAlign={"center"}
      >
        ADD Employee
      </Typography>
      <input
        name="name"
        placeholder="Enter name"
        className="inputField"
        type={"text"}
        value={employee.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Enter email"
        className="inputField"
        type={"email"}
        value={employee.email}
        onChange={handleChange}
        required
      />{" "}
      <input
        name="phone"
        placeholder="Enter Phone"
        className="inputField"
        type={"text"}
        value={employee.phone}
        onChange={handleChange}
        required
      />
      <input
        name="dob"
        placeholder="Enter Date of Birth"
        className="inputField"
        type={"date"}
        value={employee.dob}
        onChange={handleChange}
        required
      />
      <Button variant="outlined" onClick={addEmployee}>
        ADD Employee
      </Button>
    </Box>
  );
};

export default AddEmp;
