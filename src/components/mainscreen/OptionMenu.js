import * as React from "react";

import {Button,ButtonGroup,ClickAwayListener,Grow,Popper,Paper,MenuItem,MenuList} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const options = [
  <EditOutlinedIcon style={{ margin: "2px 4px" }} />,
  <DeleteOutlineIcon style={{ margin: "2px 4px" }} />,
];

export default function SplitButton({
  deleteEmployee,
  handleOpen,
  id,
  handleClose,
}) {
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
            selectedIndex === 0 ? handleOpen(id) : deleteEmployee(id);
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
