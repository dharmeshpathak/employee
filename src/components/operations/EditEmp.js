import { useEffect, useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import '../../styles/inputfield.css';
import { useParams } from 'react-router-dom';
import instance from '../../api'
function EditEmp({ login, setLogin }) {
  
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
  });
  const { id } = useParams();

  const getEmployee = async () => {
    const { data } = await instance.get(`/employees/${id}`);
    console.log(data);
    setEmployee({
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
    });
  };

  useEffect(() => {
    getEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setEmployee(() => {
      return { ...employee, [e.target.name]: e.target.value };
    });
  };

  const updateEmploee = async () => {
    const res = await instance.patch(`/employees/${id}`, {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      dob: employee.dob,
    });
    console.log(res);
    console.log('employee updates');
  };
  

  return (
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
    >
      <Typography
        variant='h4'
        component='h4'
        fontWeight={700}
        m={3}
        textAlign={'center'}
      >
        Update Employee
      </Typography>
      <input
        name='name'
        placeholder='Enter name'
        className='inputField'
        type={'text'}
        value={employee.name}
        onChange={handleChange}
        variant='standard' 
        label={"margin='normal'"}
        required
      />
      <input
        name='email'
        placeholder='Enter email'
        className='inputField'
        type={'email'}
        value={employee.email}
        onChange={handleChange}
        required
      />{' '}
      <input
        name='phone'
        placeholder='Enter Phone'
        className='inputField'
        type={'text'}
        value={employee.phone}
        onChange={handleChange}
        required
      />
      <input
        name='dob'
        placeholder='Enter Date of Birth'
        className='inputField'
        type={'date'}
        value={employee.dob}
        onChange={handleChange}
        required
      />
      <Button variant='outlined' onClick={updateEmploee}>
        Update Employee
      </Button>
    </Box>
  );
}

export default EditEmp;
