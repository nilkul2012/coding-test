import React from "react";
import { useRef } from "react";
import { Box } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import readXlsxFile from "read-excel-file";

const SelectFile = (props) => {
  const inputRef = useRef();

  const getSuppliersList = (csvData) => {
    let suppliersList = {};
    let lastPONo = null;
    let supplierName = "";
    csvData.forEach((data, idx) => {
      if (idx > 0) {
        if (lastPONo === data[1]) {
          suppliersList[supplierName] = [
            ...suppliersList[supplierName],
            {
              poNumber: data[1],
              description: data[15],
              label: `${data[1]}-${data[15]}`,
            },
          ];
        } else {
          lastPONo = data[1];
          supplierName = data[11];
          suppliersList[data[11]] = [
            {
              poNumber: data[1],
              description: data[15],
              label: `${data[1]}-${data[15]}`,
            },
          ];
        }
      }
    });
    return suppliersList;
  };

  const onAttach = (e) => {
    e.preventDefault();
    const path = (window.URL || window.webkitURL).createObjectURL(
      e.target.files[0]
    );
    props.setFile(e.target.files[0]);
    fetch(path)
      .then((response) => response.blob())
      .then((blob) => readXlsxFile(blob))
      .then((rows) => {
        props.setSupplierList(getSuppliersList(rows));
      });
  };

  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h5 style={{ fontSize: "20px", fontWeight: "600", margin: "20px" }}>
        {props.title}
      </h5>
      <Box
        sx={{
          width: "47%",
          marginLeft: props.margin,
          border: "0.5px solid gray",
          padding: "0px",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "5px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Select File"
          inputProps={{ "aria-label": "select file" }}
          value={props.file.name}
          disabled
        />
        <input
          type="file"
          accept=".xlsx, .xls, .csv, .xlsm"
          onChange={onAttach}
          hidden
          ref={inputRef}
        />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="Attach file"
          onClick={() => inputRef.current.click()}
        >
          <AttachmentIcon sx={{ mr: "10px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SelectFile;
