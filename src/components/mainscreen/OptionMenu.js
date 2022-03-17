import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {deleteEmployee} from '../../actions/index'
import { useDispatch } from "react-redux";
const options = [
  <EditOutlinedIcon style={{ margin: "2px 4px" }} />,
  <DeleteOutlineIcon style={{ margin: "2px 4px" }} />,
];

export default function SplitButton({
 
  handleOpen,
  id,
  handleClose,
}) {

  const dispatch = useDispatch();
  const [openOption, setOpenOption] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenOption(false);
  };

  const handleToggle = () => {
    setOpenOption((prevOpen) => !prevOpen);
  };

  const handleCloseoption = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenOption(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="outlined primary split button"
        

      >
        <Button
        variant="outlined"
        style={{backgroundColor:"white",
        }}
          onClick={() => {
            selectedIndex === 0 ? handleOpen(id) : dispatch(deleteEmployee(id));
          }}
        >
          {options[selectedIndex]}
        </Button>
        <Button
         variant="outlined"
        style={{backgroundColor:"white",
        }}
          size="small"
          aria-controls={openOption ? "split-button-menu" : undefined}
          aria-expanded={openOption ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={openOption}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 5 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "center top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseoption}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={`${option} ${index}`}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
