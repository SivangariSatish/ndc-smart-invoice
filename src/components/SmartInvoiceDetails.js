import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Checkbox, RadioGroup,Stack } from "@mui/material";
import WebJetInvoicePDF from "../WebJetInvoicePDF";

import PropTypes from "prop-types";

const SmartInvoiceDetails = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const generatePDF = (selected) => {
    console.log(selectedRows.length);
     WebJetInvoicePDF(selected, "WebJetInvoice.pdf");
  };

  const serviceFeeChangeHandler = (row,e) => {
    if(e.target.checked)
    {
      row.ServiceFeeIsSelected = true;
    }
    else{
      row.ServiceFeeIsSelected=false;
    }
    
    setSelectedRows(selectedRows);
  };

  const changeFeeChangeHandler = (row,e) => {
    if(e.target.checked)
    {
      row.ChangeFeeIsSelected = true;
    }
    else{
      row.ChangeFeeIsSelected=false;
    }
    
    setSelectedRows(selectedRows);
  };
  const handleChange = (row,event) => {
    row.TravelType=event.target.value;
    setSelectedRows(selectedRows);
  };
  /*global spNdcInvHelper*/
  const exchangeInformations = JSON.parse(
    spNdcInvHelper.getExchangeInformations()
  );
  const columns = [
    { field: "TicketNumber", headerName: "Ticket Number", width: 200 },
    {
      field: "Name",
      headerName: "Passenger Name",
      valueGetter: (params) => {
        return params.row.Passenger.FullName;
      },
      width: 300,
    },
    {
      field: "travel",
      headerName: "Travel",
      width: 290,
      renderCell: (params) => (
        <RadioGroup
          style={{ marginLeft: 15, marginBottom: 0 }}
          defaultValue="Domestic"
          onChange={(e) =>
            handleChange(
              selectedRows.find((t) => t.TicketNumber === params.id),e
              
            )
          }
        >
          <div style={{ marginTop: 2, marginBottom: 7 }}>
            <FormControlLabel
              value="Domestic"
              control={<Radio value="Domestic"/>}
              label="Domestic"
            />
            <FormControlLabel
              value="International"
              control={<Radio value="International"/>}label="International"
            />
          </div>
        </RadioGroup>
      ),
    },
    {
      field: "emdAirlineTax",
      headerName: "EMD/AirlineTax",
      width: 90,
      defaultValue: "EMD",
    },
    {
      field: "isServiceFeeSelected",
      headerName: "Service Fee",
      type: "bool",
      width: 90,
      renderCell: (params) => (
        <Checkbox
          style={{ marginLeft: 15, marginBottom: 0 }}
          onChange={(e) =>
            serviceFeeChangeHandler(
              selectedRows.find((t) => t.TicketNumber === params.id),e
              
            )
          }
          disabled={
            !selectedRows.length ||
            !selectedRows.find((r) => r.TicketNumber === params.id) ||
            !selectedRows.find((r) => r.TicketNumber === params.id).IsSelected
          }
        ></Checkbox>
      ),
    },
    {
      field: "changefee",
      headerName: "Change Fee",
      width: 90,
      renderCell: (params) => (
        <Checkbox
          style={{ marginLeft: 15, marginBottom: 0 }}
          onChange={(e) =>
           changeFeeChangeHandler(
              selectedRows.find((t) => t.TicketNumber === params.id),e
              
            )
          }
          defaultChecked
        ></Checkbox>
      ),
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        rows={exchangeInformations}
        getRowId={(row) => row.TicketNumber}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ticketNumbers) => {
          const selected = exchangeInformations.filter((e) =>
            ticketNumbers.includes(e.TicketNumber)
          );
          selected.forEach((t) => (t.IsSelected = true));
          selected.forEach((t) => (t.ServiceFeeIsSelected = false));
          selected.forEach((t) => (t.ChangeFeeIsSelected = true));
          selected.forEach((t) => (t.TravelType = 'Domestic'));
          console.log(selected);

          setSelectedRows(selected);
        }}
        {...exchangeInformations}
      />
       
     
   <Stack direction="row" justifyContent="center" spacing={2} >
   
      <Button   disabled={selectedRows.length === 0} variant="contained" color="primary" onClick={() => generatePDF(selectedRows)}>
        GENERATE
      </Button>
      <Button variant="contained" color="primary">CLOSE</Button>
      </Stack>
    </div>
  );
};

SmartInvoiceDetails.propTypes = {
  selectedData: PropTypes.object,
};

export default SmartInvoiceDetails;
