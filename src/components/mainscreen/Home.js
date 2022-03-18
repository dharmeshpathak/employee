import { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Paper,
  Checkbox,
  Button,
  Box,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import instance from "../../api/index";
import Toggle from "../mainscreen/Toggle";
import NewNavbar from "../Navbar/NewNavbar";
import CardElem from "../mainscreen/CardElem";
import Modl from "../mainscreen/Modal/Modl";
import OptionMenu from "../mainscreen/OptionMenu";
import "../../styles/table.css";
function Home({ login, setUpLogin }) {
  const [employee, setEmployees] = useState([]);

  const [delEmp, setDelEmp] = useState([]);
  const [gridView, setgridView] = useState(false);
  const [editId, seteditId] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    seteditId(id);
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };
  const setView = (value) => {
    if (value === "Table") setgridView(false);
    else if (value === "Grid") setgridView(true);
  };

  const getEmployee = useCallback(async () => {
    const authorId = JSON.parse(localStorage.getItem('userItem')).id
    const { data } = await instance.get(`/employees?authorId=${authorId}`);
    console.log(data);
    setEmployees(data);
  }, []);

  const deleteEmployee = async (id) => {
    const res = await instance.delete(`/employees/${id}`);
    getEmployee();

    if (res.status !== 404) {
      console.log("employee deleted");
    }
  };
  const handleOnChange = (id) => {
    if (delEmp.includes(id)) {
      setDelEmp(delEmp.filter((item) => item !== id));
    } else {
      setDelEmp([...delEmp, id]);
    }
    console.log(delEmp);
  };

  const bulkDelete = () => {
    delEmp.map(async (ids, index) => {
      await instance.delete(`/employees/${ids}`);
      getEmployee();
    });
    setDelEmp([]);
  };

  useEffect(() => {
    getEmployee();
  }, [getEmployee, open]);

  useEffect(() => {
    console.log(delEmp);
  }, [delEmp]);

  return (
    <NewNavbar login={login} setUpLogin={setUpLogin}>
      <div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <Modl
            open={open}
            handleClose={handleClose}
            login={login}
            setUpLogin={setUpLogin}
            editId={editId}
          />

          <Toggle setView={setView} />
        </div>
        <Divider />
        {!gridView && (
          <Paper
            className="container"
            style={{ margin: "50px auto 0 auto", width: "850px", zIndex: 1 }}
          >
            <Table>
              <TableHead style={{ backgroundColor: "#00E" }}>
                <TableRow>
                <TableCell style={{ color: "white" }} align="center">
                    <Button  onClick={bulkDelete} disabled={delEmp.length===0}>
                    <DeleteOutlineIcon style={{ color: "white" }}/> 
                    </Button>
                  </TableCell>
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
                  
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {employee.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                  <TableCell align="center">
                      <Checkbox
                        id={`custom-checkbox-${index}`}
                        name={row.name}
                        value={row.id}
                        onChange={() => handleOnChange(row.id)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.dob}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>

                    
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
          </Paper>
        )}

        {gridView && (
          <Box
            style={{
              margin: "50px auto 0 auto",
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            
              <Button
                style={{ placeSelf: "flex-end", marginRight: "50px" }}
                variant="outlined"
                onClick={bulkDelete}
                disabled={delEmp.length === 0}
              >
                Delete Selected
              </Button>
           

            <Box
              style={{
                margin: "50px auto 0 auto",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "20px",
                maxWidth: "940px",
              }}
            >
              {employee.map((emp) => (
                <CardElem
                  key={`card ${emp.id}`}
                  emp={emp}
                  deleteEmployee={deleteEmployee}
                  handleOnChange={handleOnChange}
                  open={open}
                  handleClose={handleClose}
                  handleOpen={handleOpen}
                />
              ))}
            </Box>
          </Box>
        )}
      </div>
    </NewNavbar>
  );
}

export default Home;
