import { useState, useEffect } from "react";
import { Paper, Typography, Box, Button, TextField } from "@mui/material";
import "../../styles/inputfield.css";
import instance from "../../api";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../Navbar/NewNavbar";
import { useFormik } from "formik";
import * as yup from "yup";
import InfoIcon from '@mui/icons-material/Info';
const validationSchema = yup.object({
  email: yup.string("Enter your email").required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});
const LoginIn = ({ setUpLogin, login }) => {
  let navigate = useNavigate();
  const [match, setmatch] = useState(true);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { data, status } = await instance.get(`/users`);
      console.log(data);

      if (status === 200) {
        const user = data.filter((emp) => {
          return (
            emp.username === values.email && emp.password === values.password
          );
        });
        if (user.length !== 0) {
          setmatch(true);
          console.log(user);

          localStorage.setItem("userItem", JSON.stringify(user[0]));

          navigate("/");
        } else {
          setmatch(false);

          return;
        }
      }
    },
  });

  useEffect(() => {
    setUpLogin();
    console.log("login = ", login);
    if (login) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

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
          position={'relative'}
        >
          {!match && (
            <span
              style={{
                color: "red",
                tranformText: "capitalise",
                backgroundColor:'rgba(255,0,0,0.1)',
                position:"absolute",
                width:"100%",
                top:'0',
                left:'0',
                display:'flex',
                justifyContent:"center",
                alignItems:"center",
                padding:"10px 0"
              }}
            ><InfoIcon /> &nbsp;
              Invalid credential
            </span>
          )}

          <Typography
            variant="h4"
            component="h4"
            fontWeight={700}
            m={3}
            textAlign={"center"}
          >
            LogIn
          </Typography>

          <TextField
            name="email"
            width={300}
            placeholder="enter email"
            className="inputField"
            type={"text"}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            placeholder="Enter password"
            className="inputField"
            type={"text"}
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />

          <Button variant="outlined" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </NewNavbar>
  );
};

export default LoginIn;
