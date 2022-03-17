import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Checkbox, Button, Box, Divider } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Toggle from "../mainscreen/Toggle";
import NewNavbar from "../Navbar/NewNavbar";
import CardElem from "../mainscreen/CardElem";
import Modl from "../mainscreen/Modal/Modl";
import OptionMenu from "../mainscreen/OptionMenu";
import "../../styles/table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  deleteEmployees,
  getEmployee,
} from "../../actions/index";
import { SET_ID } from "../../actions/types";
function Home({ login, setUpLogin }) {
  const employee = useSelector((state) => state.employees.emply);
  const selectedEmp = useSelector((state) => state.employees.selectedEmployee);
  const selectedid = useSelector((state) => state.employees.selectedId);
  const dispatch = useDispatch();

  const [delEmp, setDelEmp] = useState([]);
  const [gridView, setgridView] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    dispatch({ type: SET_ID, payload: id });
    dispatch(getEmployee());

    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };
  const setView = (value) => {
    if (value === "Table") setgridView(false);
    else if (value === "Grid") setgridView(true);
  };

  const handleOnChange = (id) => {
    if (delEmp.includes(id)) {
      setDelEmp(delEmp.filter((item) => item !== id));
    } else {
      setDelEmp([...delEmp, id]);
    }
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

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
            selectedEmp={selectedEmp}
            editId={selectedid}
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
                    <Button
                      onClick={() => dispatch(deleteEmployees(delEmp))}
                      disabled={delEmp.length === 0}
                    >
                      <DeleteOutlineIcon style={{ color: "white" }} />
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
              onClick={() => dispatch(deleteEmployees(delEmp))}
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
