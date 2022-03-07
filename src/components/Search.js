import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, ButtonGroup } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const Search = ({ login }) => {
  const [employee, setEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [filterd, setfilter] = useState([]);
  const navigate = useNavigate();
  const getEmployeeField = async () => {
    const { data } = await axios.get("http://localhost:3000/employees");
    console.log(data);

    setEmployee(data[0]);
    setEmployees(data);
  };

  const filterItems = (searchField, searchText) => {
    console.log(employees);

    console.log(searchField);

    let updatedList = employees.filter((item) => {
      
      return item[searchField]?.toString().includes(searchText);
    });
    console.log(updatedList);

    setfilter(updatedList);
  };
  

  const deleteEmployee = async (id) => {
    const res = await axios.delete(`http://localhost:3000/employees/${id}`);
    const newList = employees.filter((emp) => {
      return emp.id !== id;
    });
    setEmployees(newList);

    if (res.status !== 404) {
      console.log("employee deleted");
    }
  };

  const [searchField, setSearchField] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchField(event.target.value);
    // console.log(event.target.value);
  };
  useEffect(() => {
    getEmployeeField();
  }, []);
  useEffect(() => {
    console.log("searchField = ", searchField, "searchText=", searchText);
    filterItems(searchField, searchText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, searchText, employees]);

  useEffect(() => {
    if (!login) navigate("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <Container>
      <Box
        sx={{ minWidth: 120, maxWidth: 450 }}
        elevation={1}
        component={Paper}
        p={4}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={700}
        margin={"auto"}
        mt={4}
      >
        <Typography
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            wordSpacing: "2px",
            fontFamily: "sans-serif",
          }}
        >
          Search Here
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchField}
            label="Age"
            onChange={handleChange}
          >
            {Object.keys(employee).map((item) => (
              <MenuItem value={item} key={item.id}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            style={{ marginTop: "20px" }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);

              // filterItems(searchField, searchText);
            }}
          />
        </FormControl>
      </Box>

      {filterd.length > 0 ? (
        <Box display={"flex"} justifyContent={"center"} m={4}>
          <TableContainer component={Paper} sx={{ maxWidth: 750 }}>
            <Table sx={{ minWidth: 688 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>ID</TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    Name
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    Email
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    DOB
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    Phone
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterd.map((row, index) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{ minWidth: 120, maxWidth: 450 }}
          elevation={1}
          component={Paper}
          p={4}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          maxWidth={700}
          margin={"auto"}
          mt={4}
        >
          <Typography style={{ fontFamily: "sans-serif", fontWeight: 700 }}>
            Sorry!! No data found for given Input.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Search;
