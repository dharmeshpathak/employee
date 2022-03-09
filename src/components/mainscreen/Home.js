import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Checkbox, Button, ButtonGroup } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import instance from '../../api/index';

import NewNavbar from '../Navbar/NewNavbar'

function Home({ login, setUpLogin }) {
 
  const [employee, setEmployees] = useState([]);
  
 const [delEmp, setDelEmp] = useState([]);

  // const [checkedState, setCheckedState] = useState(new Array(3).fill(false));

  const getEmployee = useCallback(async () => {
    const { data } = await instance.get(`/employees`);

    
    setEmployees(data);
   
  }, []);

  

  const deleteEmployee = async (id) => {
    const res = await instance.delete(`/employees/${id}`);
    getEmployee();
   
    if (res.status !== 404) {
      console.log('employee deleted');
    }
  };
  const handleOnChange = (id) => {

    if(delEmp.includes(id)){
      setDelEmp(delEmp.filter((item)=>item !== id)) 
    }else{
      setDelEmp([...delEmp,id])
      
    }
    
  };

  const bulkDelete = () => {
      delEmp.map(
      async (ids, index) =>  {
        await instance.delete(`/employees/${ids}`)
        getEmployee();
  }
    );
    setDelEmp([]);
    
    
  };

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

 useEffect(()=>{
console.log(delEmp);
 },[delEmp])
  return (
    <NewNavbar login={login} setUpLogin={setUpLogin} >
    <div >
      <Paper className='container'  style={{margin :'50px auto 0 auto' ,width:'750px'}}>
        <Table    >
          <TableHead style={{ backgroundColor: '#00E' }}>
            <TableRow>
              <TableCell style={{ color: 'white' }}>ID</TableCell>
              <TableCell style={{ color: 'white' }} align='left'>
                Name
              </TableCell>
              <TableCell style={{ color: 'white' }} align='left'>
                Email
              </TableCell>
              <TableCell style={{ color: 'white' }} align='left'>
                DOB
              </TableCell>
              <TableCell style={{ color: 'white' }} align='left'>
                Phone
              </TableCell>
              <TableCell style={{ color: 'white' }} align='center'>
                Action
              </TableCell>
              <TableCell style={{ color: 'white' }} align='center'>
                <Button onClick={bulkDelete}>
                  <DeleteOutlineIcon style={{ color: 'white' }} />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='left'>{row.name}</TableCell>
                <TableCell align='left'>{row.email}</TableCell>
                <TableCell align='left'>{row.dob}</TableCell>
                <TableCell align='left'>{row.phone}</TableCell>
                <TableCell align='center'>
                  <ButtonGroup
                    variant='contained'
                    aria-label='outlined primary button group'
                  >
                    <Button
                      onClick={() => deleteEmployee(row.id)}
                      variant='outlined'
                    >
                      <DeleteOutlineIcon />
                    </Button>
                    <Button variant='outlined'>
                      <Link to={`/update/${row.id}`}>
                        <EditOutlinedIcon />
                      </Link>
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell align='center'>
                  <Checkbox
                   
                    id={`custom-checkbox-${index}`}
                    name={row.name}
                    value={row.id}
                   
                    onChange={() => handleOnChange(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
    </NewNavbar>
  );
}

export default Home;
