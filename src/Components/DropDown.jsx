import React from "react";
import { Box, Autocomplete, TextField } from "@mui/material";
import './DropDown.css'

const DropDown = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h5 style={{ fontSize: "20px", fontWeight: "600",margin:'20px' }}>
        {props.title}
      </h5>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.arrayItems}
        sx={{ width: '50%', marginLeft: props.margin}}
        renderInput={(params) => <TextField {...params} label={props.title} />}
        onChange={(e)=>props.onChange(e.target.innerText)}
        value={props.value}
      />
    </Box>
  );
};

export default DropDown;
