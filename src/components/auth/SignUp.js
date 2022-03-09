import { useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import '../../styles/inputfield.css';
import instance from '../../api'
import NewNavbar from '../Navbar/NewNavbar'
function SignUp({login,setUpLogin}) {
  const [employee, setEmployee] = useState({
    username: '',
    password: '',
    cpassword: '',
  });
  const [match, setmatch] = useState(true);
  const handleChange = (e) => {
    setEmployee(() => {
      return { ...employee, [e.target.name]: e.target.value };
    });
  };

  const addEmployee = async () => {
    if (employee.cpassword !== employee.password) {
      setmatch(false);
      
      return;
    } else if (employee.cpassword === employee.password) {
      setmatch(true);
     
    }

    const res = await instance.post(`/users`, {
      username: employee.username,
      password: employee.password,
    });
    if (res.status === 201) {
      console.log('user Added');
      setEmployee({
        username: '',
        password: '',
        cpassword: '',
      });
    }
  };

  return (
    <NewNavbar login={login} setUpLogin = {setUpLogin}>
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
        SignUp
      </Typography>
      <input
        name='username'
        placeholder='Enter usename'
        className='inputField'
        type={'text'}
        value={employee.username}
        onChange={handleChange}
        required
      />

      <input
        name='password'
        placeholder='Enter password'
        className='inputField'
        type={'password'}
        value={employee.password}
        onChange={handleChange}
        required
      />
      {!match && <label style={{ color: 'red' }}>Passwords do not match</label>}
      <input
        name='cpassword'
        placeholder='Confirm Password'
        className='inputField'
        type={'password'}
        value={employee.cpassword}
        onChange={handleChange}
        required
      />
      <Button variant='outlined' onClick={addEmployee}>
        SignUp
      </Button>
    </Box>
    </NewNavbar>
  );
}

export default SignUp;
