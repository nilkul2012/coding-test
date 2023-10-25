import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PopUp from "./Pages/PopUp";
import SelectFile from "./Components/SelectFile";
import './App.css'

const App = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [docketList, setDocketList] = useState([]);
  const [supplierList, setSupplierList] = useState({});

  useEffect(()=> {
    const localStorageData = JSON.parse(window.localStorage.getItem('docketList'))
    if(localStorageData && localStorageData.length){
      setDocketList(localStorageData)
    }
  },[])

  const submit = (details) => {
    setDocketList([...docketList, details]);
    window.localStorage.setItem("docketList", JSON.stringify([...docketList, details]))
    setOpen(false);
  };
  const onclick = () => {
    if (file) {
      setOpen(true);
    } else {
      alert("Please select Excel File");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <paper>
      <h3 className="title">Purchage Order Deatils</h3>
      <div style={{display:'flex',alignItems:'center'}}>
      <SelectFile
        title="Select Excel File"
        margin="125px"
        setSupplierList={setSupplierList}
        file={file}
        setFile={setFile}
      />
        <Button sx={{height:'45px'}} variant="contained" onClick={onclick}>
          Add Docket
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Start time</TableCell>
              <TableCell align="right">End time</TableCell>
              <TableCell align="right">No.of hours worked</TableCell>
              <TableCell align="right">Rate per hour</TableCell>
              <TableCell align="right">Supplier Name</TableCell>
              <TableCell align="right">Purchase Order</TableCell>
              <TableCell align="right">Order Discription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {docketList.map((docket) => (
              <TableRow key={docket.name}>
                <TableCell>{docket.name}</TableCell>
                <TableCell align="right">{docket.startTime}</TableCell>
                <TableCell align="right">{docket.endTime}</TableCell>
                <TableCell align="right">{docket.hours}</TableCell>
                <TableCell align="right">{docket.rate}</TableCell>
                <TableCell align="right">{docket.supplier}</TableCell>
                <TableCell align="right">{docket.selectedPo}</TableCell>
                <TableCell align="right">{docket.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PopUp
        open={open}
        handleClose={handleClose}
        submit={submit}
        supplierList={supplierList}
      />
    </paper>
  );
};

export default App;
