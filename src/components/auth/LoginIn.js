import { useEffect, useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import '../../styles/inputfield.css';
import instance from '../../api'
import { Link, useNavigate } from 'react-router-dom';
const LoginIn = ({ setUpLogin, login }) => {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({
    username: '',
    password: '',
  });

  const [match, setmatch] = useState(true);
  const handleChange = (e) => {
    setEmployee(() => {
      return { ...employee, [e.target.name]: e.target.value };
    });
  };

  const loginEmp = async () => {
    const { data, status } = await instance.get(`/users`);

    if (status === 200) {
      const user = data.filter((emp) => {
        return (
          emp.username === employee.username && emp.password === employee.password
        );
      });
      if (user.length !== 0) {
        setmatch(true);

        localStorage.setItem('userItem', JSON.stringify(user[0]));

        navigate('/');
      } else {
        setmatch(false);
        localStorage.setItem('userItem', null);
      }
    }
  };
  useEffect(() => {
    setUpLogin();
    console.log('login = ', login);
    if (login) navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

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
        LogIn
      </Typography>
      {!match && <label style={{ color: 'red' }}>Invalid Credentials</label>}
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

      <Button variant='outlined' onClick={loginEmp}>
        Login
      </Button>
      <Link
        to='/signup'
        style={{
          textDecoration: 'none',
          padding: '5px 20px',
          border: '2px solid skyblue',
          marginTop: '10px',
        }}
      >
        SignUp
      </Link>
    </Box>
  );
};

export default LoginIn;
