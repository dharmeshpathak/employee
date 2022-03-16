import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {  Paper, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import instance from '../../api'
import NewNavbar from '../Navbar/NewNavbar'
import "../../styles/table.css"
import Modl from "../mainscreen/Modal/Modl";
import OptionMenu from "../mainscreen/OptionMenu"
const Search = ({ login,setUpLogin }) => {
  const [employee, setEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [filterd, setfilter] = useState([]);
  const [editId, seteditId] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    seteditId(id);
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };
 
  const getEmployeeField = async () => {
    const { data } = await instance.get(`/employees`);
    console.log(data);

    setEmployee(data[0]);
    setEmployees(data);
  };

  const filterItems = (searchField, searchText) => {
    console.log(employees);

    console.log(searchField);

    let updatedList = employees.filter((item) => {
      
      return item[searchField]?.toString()?.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log(updatedList);

    setfilter(updatedList);
  };
  

  const deleteEmployee = async (id) => {
    const res = await instance.delete(`/employees/${id}`);
    const newList = employees.filter((emp) => {
      return emp.id !== id;
    });
    setEmployees(newList);

    if (res.status !== 404) {
      console.log('employee deleted');
    }
  };

  const [searchField, setSearchField] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchField(event.target.value);
    // console.log(event.target.value);
  };

  useEffect(() => {
    getEmployeeField();
  }, [open]);

  useEffect(() => {
    // console.log('searchField = ', searchField, 'searchText=', searchText);
    filterItems(searchField, searchText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, searchText, employees]);

  

  return (
    <NewNavbar login={login} setUpLogin={setUpLogin} >
    
    <Box >
    <Modl
            open={open}
            handleClose={handleClose}
            login={login}
            setUpLogin={setUpLogin}
            editId={editId}
          />
      <Box
      key = 'main'
        sx={{ minWidth: 120, maxWidth: 450 }}
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
          style={{
            fontSize: '2rem',
            fontWeight: 600,
            wordSpacing: '2px',
            fontFamily: 'sans-serif',
          }}
        >
          Search Here
        </Typography>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Filter By</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={searchField}
            label='Age'
            onChange={handleChange}
          >
            {Object.keys(employee).map((item) => (
              <MenuItem value={item} key={item}>
             
                {item}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id='outlined-basic'
            label='Type Here'
            variant='outlined'
            style={{ marginTop: '20px' }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);

              
            }}
          />
        </FormControl>
      </Box>

      {(searchField===''?employees.length:filterd.length )> 0 ? (
        <Box display={'flex'} justifyContent={'center'}  mt = {6} key = 'box1'>
          <TableContainer className='container' component={Paper} sx={{ maxWidth: 750 }}>
            <Table aria-label='simple table'>
              <TableHead style={{ backgroundColor: 'black' }}>
                <TableRow key ='head1'>
                  <TableCell style={{ color: 'white' }} key='id'>ID</TableCell>
                  <TableCell style={{ color: 'white' }} align='right' key='userame'>
                    Name
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='right' key='Email'>
                    Email
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='right' key='DOB'>
                    DOB
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='right' key='Phone'>
                    Phone
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center' key='Action'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(searchField===''?employees:filterd).map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                   
                  >
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell align='right'>{row.name}</TableCell>
                    <TableCell align='right'>{row.email}</TableCell>
                    <TableCell align='right'>{row.dob}</TableCell>
                    <TableCell align='right'>{row.phone}</TableCell>
                    <TableCell>
                      <OptionMenu
                        handleOpen={handleOpen}
                        deleteEmployee={deleteEmployee}
                        id={row.id}
                        handleClose={handleClose}
                      />
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{ minWidth: 120, maxWidth: 450 }}
          key='box2'
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
          <Typography style={{ fontFamily: 'sans-serif', fontWeight: 700 }}>
            Sorry!! No data found for given Input.
          </Typography>
        </Box>
      )}
    </Box>
    </NewNavbar>
  );
};

export default Search;
