import { Paper, Typography, Box, Button, TextField } from "@mui/material";
import "../../styles/inputfield.css";

import NewNavbar from "../Navbar/NewNavbar";
import * as yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import {signUp} from '../../actions/userActions'
import { useEffect } from "react";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
function SignUp({ login, setUpLogin }) {
  const [match, setmatch] = useState(false);
  const dispatch = useDispatch()
  const matched = useSelector(state=>state.user.match)
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(signUp(values))
      
          values.email = "";

          values.password = "";
          values.cpassword = "";
       
      
    },
  });
  useEffect(()=>{
    setmatch(matched)

  },[matched])

  return (
    <NewNavbar login={login} setUpLogin={setUpLogin}>
      <form onSubmit={formik.handleSubmit}>
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
          gap={2}
          position='relative'
        >
          {match && (
            <span
              style={{
                color: "red",
                tranformText: "capitalise",
                backgroundColor: "rgba(255,0,0,0.1)",
                position: "absolute",
                width: "100%",
                top: "0",
                left: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 0",
              }}
            >
              <InfoIcon /> &nbsp; User Already Exist
            </span>
          )}
          <Typography
            variant="h4"
            component="h4"
            fontWeight={700}
            m={3}
            textAlign={"center"}
          >
            SignUp
          </Typography>
          <TextField
            name="email"
            width={300}
            placeholder="enter email"
            className="inputField"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            width="300"
            placeholder="Enter password"
            className="inputField"
            type={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            width={300}
            name="cpassword"
            placeholder="Confirm Password"
            className="inputField"
            type={"password"}
            value={formik.values.cpassword}
            onChange={formik.handleChange}
            error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
            helperText={formik.touched.cpassword && formik.errors.cpassword}
          />

          <Button variant="outlined" type="submit">
            SignUp
          </Button>
        </Box>
      </form>
    </NewNavbar>
  );
}

export default SignUp;
