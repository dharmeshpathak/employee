import React from 'react'
import {ToggleButtonGroup,ToggleButton} from '@mui/material'
function Toggle({setView}) {
    const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="Table" onClick={(e)=>setView(e.target.value)}>List</ToggleButton>
      <ToggleButton value="Grid" onClick={(e)=>setView(e.target.value)}>Grid</ToggleButton>
     
    </ToggleButtonGroup>
  )
}

export default Toggle