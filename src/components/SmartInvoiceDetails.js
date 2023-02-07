import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Checkbox, RadioGroup } from "@mui/material";
import WebJetInvoicePDF from "../WebJetInvoicePDF";

import PropTypes from "prop-types";

const SmartInvoiceDetails = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const generatePDF = (invoiceData) => {
    invoiceData = selectedRows;
    WebJetInvoicePDF(invoiceData, "WebJetInvoice.pdf");
  };
   /*global spNdcInvHelper*/
   const exchangeInformations = JSON.parse(spNdcInvHelper.getExchangeInformations());
   console.log(exchangeInformations.length);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "TicketNumber", headerName: "TicketNumber", width: 400 },
    {
      field: "travel",
      headerName: "Travel",
      width: 290,
      renderCell: (params) => (
        <RadioGroup style={{ marginLeft: 15, marginBottom: 0 }}>
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
    },
    {
      field: "phonefee",
      headerName: "Phone Fee",
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
        <Checkbox style={{ marginLeft: 15, marginBottom: 0 }}></Checkbox>
      ),
    },
  ];
  console.log(exchangeInformations)
  const rows = exchangeInformations.map((e, i)=> {
    return {
      id : i,
      TicketNumber: `${e.TicketNumber} (${e.Passenger.FullName})`,
      travel: "Domestic",
      emdAirlineTax: "EMD",
      phonefee: 0,
      changefee: 1,
    }
  });
  console.log(rows);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
      sx={{
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));

          setSelectedRows(selectedRows);
        }}
        {...rows}
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
