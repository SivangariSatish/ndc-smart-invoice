import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Checkbox, RadioGroup } from "@mui/material";
import WebJetInvoicePDF from "../WebJetInvoicePDF";

import PropTypes from "prop-types";

const SmartInvoiceDetails = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const generatePDF = (selected) => {
    console.log(selected);
     WebJetInvoicePDF(selected, "WebJetInvoice.pdf");
  };

  const serviceFeeChangeHandler = (row) => {
    row.ServiceFeeIsSelected = !row.ServiceFeeIsSelected;
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
        >
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
              selectedRows.find((t) => t.TicketNumber === params.id)
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
          console.log(selected);

          setSelectedRows(selected);
        }}
        {...exchangeInformations}
      />
      <Button variant="outlined"  disabled={selectedRows.legnth} onClick={() => generatePDF(selectedRows)}>
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
