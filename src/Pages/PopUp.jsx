import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import Input from "../Components/Input";
import DropDown from "../Components/DropDown";
import PopupModal from "../Components/PopupModal";
import './PopUp.css';

function PopUp(props) {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [poList, setPoList] = useState([]);
  const [selectedPOLabel, setSelectedPOLabel] = useState("");
  const [selectedPo, setSelectedPO] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (supplier) {
      setPoList(props?.supplierList[supplier]?.map((item) => item.label));
      setSelectedPOLabel("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier]);

  useEffect(() => {
    if (selectedPOLabel) {
      props.supplierList[supplier]?.forEach((item) => {
        if (item.label === selectedPOLabel) {
          setSelectedPO(item.poNumber);
          setDescription(item.description);
        }
      });
    } else {
      setDescription("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPOLabel]);

  const saveDetails = () => {
    let docketDetails = {
      name,
      startTime,
      endTime,
      hours,
      rate,
      supplier,
      selectedPo,
      description,
    };
    if (
      name !== "" &&
      startTime !== "" &&
      endTime !== "" &&
      hours !== "" &&
      rate !== "" &&
      supplier !== "" &&
      selectedPo !== "" &&
      description !== ""
    ) {
      props.submit(docketDetails);
      setName("");
      setStartTime("");
      setEndTime("");
      setHours("");
      setRate("");
      setSupplier("");
      setSelectedPOLabel("");
    } else {
      alert("Please enter the all Fileds");
    }
  };

  const onClose = () => {
    props.handleClose();
    setName("");
    setStartTime("");
    setEndTime("");
    setHours("");
    setRate("");
    setSupplier("");
    setSelectedPOLabel("");
  };

  return (
    <PopupModal open={props.open} handleClose={props.handleClose}>
      <Box className="wrapperBox">
        <Paper className="wrapperPaper">
          <Input
            title="Name"
            margin="215px"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            title="Start time"
            margin="180px"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            title="End time"
            margin="190px"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <Input
            title="No.of hours worked"
            margin="90px"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <Input
            title="Rate per hour"
            margin="150px"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <DropDown
            title="Supplier Name"
            margin="140px"
            arrayItems={Object.keys(props.supplierList)}
            onChange={setSupplier}
            value={supplier}
          />
          <DropDown
            title="Purchase Order"
            margin="140px"
            arrayItems={poList}
            onChange={setSelectedPOLabel}
            value={selectedPOLabel}
          />
          <Button
            variant="contained"
            onClick={saveDetails}
            className='btnSave'
            sx={{
              position: "absolute",
              margin: "10px",
              p: "10px",
              right: "150px",
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              position: "absolute",
              margin: "10px",
              p: "10px",
              right: "50px",
            }}
          >
            Close
          </Button>
        </Paper>
      </Box>
    </PopupModal>
  );
}

export default PopUp;
