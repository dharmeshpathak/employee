import { Paper, Typography, Box, Button,TextField } from '@mui/material';
import '../../styles/inputfield.css';
import instance from '../../api'
import NewNavbar from '../Navbar/NewNavbar'
import * as yup from 'yup';
import React from 'react';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
    cpassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')

});
function SignUp({login,setUpLogin}) {

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
      cpassword:'foobar'
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      const res = await instance.post(`/users`, {
        email: values.email,
        password: values.password,
      });
      if (res.status === 201) {
        console.log('user Added');
        values.email='';

        values.password='';
        values.cpassword='';
        
      }
    },
  });


 

  return (
    <NewNavbar login={login} setUpLogin = {setUpLogin}>
    <form onSubmit={formik.handleSubmit} >
    <Box
      elevation={1}
      component={Paper}
      p={4}
      display='flex'
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      maxWidth={700}
      margin={'auto'}
      mt={4}
      gap={2}
    >
    
      <Typography
        variant='h4'
        component='h4'
        fontWeight={700}
        m={3}
        textAlign={'center'}
      >
        SignUp
      </Typography>
      <TextField
        name='email'
        width={300}
        placeholder='enter email'
        className='inputField'
        type='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        
        
      />

      <TextField
        name='password'
        width={300}
        placeholder='Enter password'
        className='inputField'
        type={'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        
        
      />
      
      <TextField
      width={300}
        name='cpassword'
        placeholder='Confirm Password'
        className='inputField'
        type={'password'}
        value={formik.values.cpassword}
        onChange={formik.handleChange}
        error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
          helperText={formik.touched.cpassword && formik.errors.cpassword}
        
        
      />




      <Button variant='outlined' type='submit'>
        SignUp
      </Button>
      
    </Box>
    </form>


    </NewNavbar>
  );
}

export default SignUp;
