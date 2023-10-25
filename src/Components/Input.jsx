import { Box, TextField } from "@mui/material";
import React from "react";

const Input = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h5 style={{ fontSize: "20px", fontWeight: "600",margin:'20px' }}>
        {props.title}
      </h5>
      
      <TextField
        sx={{ width: "50%", marginLeft: props.margin }}
        id="outlined-basic"
        label={props.type==='time'? null : props.title}
        type={props.type}
        variant="outlined"
        onChange={props.onChange}
        value={props.value}
      />
    </Box>
  );
};

export default Input;
