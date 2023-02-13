import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Checkbox, RadioGroup } from "@mui/material";
import WebJetInvoicePDF from "../WebJetInvoicePDF";

import PropTypes from "prop-types";

const SmartInvoiceDetails = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const generatePDF = () => {
    WebJetInvoicePDF(selectedRows, "WebJetInvoice.pdf");
  };
  /*global spNdcInvHelper*/
  const exchangeInformations = JSON.parse(
    spNdcInvHelper.getExchangeInformations()
  );
  console.log(exchangeInformations.length);
  const columns = [
    { field: "TicketNumber", headerName: "Ticket Number", width: 200 },  
    {field:"Name", headerName:"Passenger Name",valueGetter: (params) => {    
      
      return params.row.Passenger.FullName
    },
    width:300} , 
    {
      field: "travel",
      headerName: "Travel",
      width: 290,
      renderCell: (params) => (
        <RadioGroup style={{ marginLeft: 15, marginBottom: 0 }} defaultValue="Domestic">
          <div style={{ marginTop: 2, marginBottom: 7 }}>
            <FormControlLabel
              value="Domestic"
              control={<Radio value="Domestic" />}
              label="Domestic"
            />
            <FormControlLabel
              value="International"
              control={<Radio value="International" />}
              label="International"
            />
          </div>
        </RadioGroup>
      ),
    },
    {
      field: "emdAirlineTax",
      headerName: "EMD/AirlineTax",
      width: 90,
      defaultValue:'EMD'
    },
    {
      field: "serviceFee",
      headerName: "Service Fee",
      type: "bool",
      width: 90,
      renderCell: (params) => (
        <Checkbox style={{ marginLeft: 15, marginBottom: 0 }}></Checkbox>
      ),
    },
    {
      field: "changefee",
      headerName: "Change Fee",
      width: 90,
      renderCell: (params) => (
        <Checkbox style={{ marginLeft: 15, marginBottom: 0 }} defaultChecked></Checkbox>
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
        onSelectionModelChange={(ticketNumbers) => {
          console.log(ticketNumbers);
          console.log(exchangeInformations);
          const selected = exchangeInformations.filter(
            (e) => ticketNumbers.includes(e.TicketNumber)
          );
          console.log(selected);

          setSelectedRows(selected);
        }}
        {...exchangeInformations}
      />
      <Button variant="outlined" onClick={generatePDF}>
        GENERATE
      </Button>
      <Button variant="outlined">CLOSE</Button>
    </div>
  );
};

SmartInvoiceDetails.propTypes = {
  selectedData: PropTypes.object,
};

export default SmartInvoiceDetails;
