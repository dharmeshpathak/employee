import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box, Checkbox, Button, ButtonGroup } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import instance from '../../api/index'
function Home({ login, setUpLogin }) {
  const [employee, setEmployees] = useState([]);
  const navigate = useNavigate();
  const delEmp = [];

  const [checkedState, setCheckedState] = useState(new Array(3).fill(false));

  const getEmployee = useCallback(async () => {
    const { data } = await instance.get(`/employees`);

    // setEmployees(employees.data);
    setEmployees(data);
    setCheckedState(resize(checkedState, data.length, false));
    console.log(checkedState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resize(arr, newSize, defaultValue) {
    return [
      ...arr,
      ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue),
    ];
  }
  
  const deleteEmployee = async (id) => {
    const res = await instance.delete(`/employees/${id}`);
    const newList = employee.filter((emp) => {
      return emp.id !== id;
    });
    setEmployees(newList);

    if (res.status !== 404) {
      console.log("employee deleted");
    }
  };
  const handleOnChange = (id) => {
    console.log(id);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === id ? !item : item
    );
    setCheckedState(updatedCheckedState);
    // console.log(checkedState)
  };

  const bulkDelete = () => {
    checkedState.map(async (itemInd, index) => {
      if (itemInd) {
        delEmp.push(employee[index]);
        console.log(delEmp);
      }
    });

    delEmp.map(
      async (empl, index) =>
        await instance.delete(`/employees/${empl.id}`)
    );
    navigate("/addEmployee");
  };

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  useEffect(() => {
    if (!login) navigate("/login");
    setUpLogin();
    // getEmployee();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <Box display={"flex"} justifyContent={"center"} m={4}>
      <TableContainer component={Paper} sx={{ maxWidth: 850 }}>
        <Table sx={{ minWidth: 688 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#00E" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>ID</TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Name
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Email
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                DOB
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Phone
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Action
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                <Button onClick={bulkDelete}>
                  <DeleteOutlineIcon style={{ color: "white" }} />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.dob}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      onClick={() => deleteEmployee(row.id)}
                      variant="outlined"
                    >
                      <DeleteOutlineIcon />
                    </Button>
                    <Button variant="outlined">
                      <Link to={`/update/${row.id}`}>
                        <EditOutlinedIcon />
                      </Link>
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={row.name}
                    value={row.id}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Home;
