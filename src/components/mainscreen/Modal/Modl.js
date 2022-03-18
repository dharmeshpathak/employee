import React,{ useEffect, useState,useCallback } from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Paper, Typography, Button,TextField } from '@mui/material';
import instance from 'api'
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
const style = {
    width: 400,
    bgcolor: 'white',
    p: 2,
    px: 4,
    pb: 3,
    zIndex:1
  };
function Modl({open,handleClose,editId}) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
      });
      const getEmployee = useCallback(async () => {
          console.log("id from modal",editId)
        const { data } = await instance.get(`/employees/${editId}`);
        console.log(data);
        setEmployee({
          name: data.name,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
        });
      },[editId])

      const handleChange = (e) => {
        setEmployee(() => {
          return { ...employee, [e.target.name]: e.target.value };
        });
      };
      const updateEmploee = async () => {
        const res = await instance.patch(`/employees/${editId}`, {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          dob: employee.dob,
        });
        console.log(res);
        console.log('employee updates');
        getEmployee();
      };

      useEffect(() => {
        getEmployee();
      }, [editId, getEmployee]);
  return (
   
    <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >

        <Box sx={style} elevation={1}
      component={Paper}
      p={4}
      display='flex'
      flexDirection={'column'}
      justifyContent={'center'}
      
      maxWidth={700}
      gap={2}
      margin={'auto'}
     >
        <Typography
        variant='h5'
        component='h4'
        fontWeight={700}
        m={3}
        textAlign={'center'}
      >
        Update Employee
      </Typography>
      <TextField
        name='name'
        placeholder='Enter name'
        className='inputField'
        type={'text'}
        value={employee.name}
        onChange={handleChange}
       
        
        required
      />
      <TextField
        name='email'
        placeholder='Enter email'
        className='inputField'
        type={'email'}
        value={employee.email}
        onChange={handleChange}
        required
      />{' '}
      <TextField
        name='phone'
        placeholder='Enter Phone'
        className='inputField'
        type={'text'}
        value={employee.phone}
        onChange={handleChange}
        required
      />
      <TextField
        name='dob'
        placeholder='Enter Date of Birth'
        className='inputField'
        type={'date'}
        value={employee.dob}
        onChange={handleChange}
        
        required
      />
      <Button variant='outlined' 
     style={{alignSelf:"center"}}
      onClick={()=>{updateEmploee();
      handleClose();
     
      }}>
        Update Employee
      </Button>
        </Box>





      </StyledModal>
    
  )
}

export default Modl
