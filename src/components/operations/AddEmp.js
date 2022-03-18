import React from 'react';
import { useState, } from 'react';
import { Paper, Typography, Box, Button, TextField } from '@mui/material';
import 'styles/inputfield.css';
import NewNavbar from '../Navbar/NewNavbar'

import {addEmployees} from 'actions/index'
import { useDispatch } from 'react-redux';
const AddEmp = ({ login, setUpLogin }) => {

  const dispatch = useDispatch();
 
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
  });
  const handleChange = (e) => {
    setEmployee(() => {
      return { ...employee, [e.target.name]: e.target.value };
    });
  };

  


  return (
    <NewNavbar login={login} setUpLogin={setUpLogin} >
    <Box
      elevation={1}
      component={Paper}
      p={4}
      display="flex"
      flexDirection={"column"}
     
      mt={4}
      gap={2}
      margin = {"auto"}
      maxWidth={"600px"}
      alignItems={"center"}
      
      
    >
      <Typography
     
        variant='h4'
        component='h4'
        fontWeight={700}
        m={3}
        textAlign={'center'}
      >
        ADD Employee
      </Typography>
      <TextField
     
        name='name'
        placeholder='Enter name'
        className='inputField'
        type={'text'}
        value={employee.name}
        onChange={handleChange}
        style={{width:"100%"}}
        required
      />
      <TextField
        name='email'
        placeholder='Enter email'
        className='inputField'
        type='email'
        style={{width:"100%"}}
       
        value={employee.email}
        onChange={handleChange}
        required
      />{' '}
      <TextField
      style={{width:"100%"}}
        name='phone'
        placeholder='Enter Phone'
        className='inputField'
        type={'text'}
        value={employee.phone}
        onChange={handleChange}
        required
      />
      <TextField
     style={{width:"100%"}}
        name='dob'
        placeholder='Enter Date of Birth'
        className='inputField'
        type={'date'}
        value={employee.dob}
        onChange={handleChange}
        required
      />
      <Button 
     style={{alignSelf:"center"}}
      variant='outlined' 
      
      onClick={()=>{dispatch(addEmployees(employee));
      setEmployee({
    name: '',
    email: '',
    phone: '',
    dob: '',
  })
      }}
      >
        ADD Employee
      </Button>
    </Box>
    </NewNavbar>
  );
};

export default AddEmp;
