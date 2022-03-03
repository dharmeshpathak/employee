import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
function Home({ login, setUpLogin }) {
  const [employee, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getEmployee = async () => {
    const employees = await axios.get("http://localhost:3000/employees");
    setEmployees(employees.data);
    console.log(employees.data);
  };
  const deleteEmployee = async (id) => {
    const res = await axios.delete(`http://localhost:3000/employees/${id}`);
    const newList = employee.filter((emp) => {
      return emp.id !== id;
    });
    setEmployees(newList);

    if (res.status !== 404) {
      console.log("employee deleted");
    }
  };
  useEffect(() => {
    if (!login) navigate("/login");
    setUpLogin();
    getEmployee();
    console.log("login = ", login);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <Box display={"flex"} justifyContent={"center"} m={4}>
      <TableContainer component={Paper} sx={{ maxWidth: 750 }}>
        <Table sx={{ minWidth: 688 }} aria-label="simple table">
          <TableHead style = {{backgroundColor:"black"
          }}   >
            <TableRow>
              <TableCell style={{color:"white"}}>ID</TableCell>
              <TableCell style={{color:"white"}}align="right">Name</TableCell>
              <TableCell style={{color:"white"}}align="right">Email</TableCell>
              <TableCell style={{color:"white"}}align="right">DOB</TableCell>
              <TableCell style={{color:"white"}}align="right">Phone</TableCell>
              <TableCell style={{color:"white"}}align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.dob}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">
                  <button
                    style={{ margin: "2px", cursor: "pointer" }}
                    onClick={() => deleteEmployee(row.id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                  <button style={{ cursor: "pointer" }}>
                    <Link to={`/update/${row.id}`}>
                      <EditOutlinedIcon />
                    </Link>
                  </button>
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
