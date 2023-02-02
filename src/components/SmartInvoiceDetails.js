import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel"
import { Button, Checkbox, RadioGroup } from '@mui/material';
import WebJetInvoicePDF from '../WebJetInvoicePDF';

import PropTypes from 'prop-types';



const SmartInvoiceDetails = () => {

  const [selectedRows, setSelectedRows] = React.useState([]);
 const generatePDF = (invoiceData) => {
 console.log(selectedRows.ticketNumber);
 invoiceData=selectedRows;
 
 WebJetInvoicePDF(invoiceData,'WebJetInvoice.pdf') ;
 
 
 
}
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ticketNumber', headerName: 'TicketNumber', width: 130 },
    { field: 'travel', headerName: 'Travel', width: 290,
    renderCell: (params) => (
      <RadioGroup style={{ marginLeft: 15, marginBottom: 0 }}>
        <div style={{ marginTop: 2, marginBottom: 7 }}>
          <FormControlLabel
            value="Domestic"
            control={<Radio value="Domestic" />}
            label='Domestic'
          />
          <FormControlLabel
            value="International"
            control={<Radio value="International" />}
            label='International'
          />

        </div>
        </RadioGroup>
    ) },
    {
      field: 'emdAirlineTax',
      headerName: 'EMD/AirlineTax',     
      width: 90     
    },
    {
      field: 'phonefee',
      headerName: 'Phone Fee',
      type: 'bool',
      width: 90,
      renderCell: (params) => (
        <Checkbox style={{ marginLeft: 15, marginBottom: 0 }}>
          </Checkbox>
      )
    },
    {
      field: 'changefee',
      headerName: 'Change Fee',
      width: 90,
      renderCell: (params) => (
        <Checkbox style={{ marginLeft: 15, marginBottom: 0 }}>
          </Checkbox>
      )
    },
  ];
  const rows = [
    { id: 1, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1},
    { id: 2, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 3, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 4, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 5, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 6, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 7, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 8, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 9, ticketNumber: 'MEYERS/BELINDA JAY MISS', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1},
  ];
    return (
      <div style={{ height: 400, width: '100%' }}>
      
      <DataGrid
        rows={rows}
        columns={columns}       
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) =>
            selectedIDs.has(row.id),
          );

          setSelectedRows(selectedRows);
        }}
        {...rows}
      />
     <Button variant="outlined" onClick={generatePDF}>GENERATE</Button> 
     <Button variant="outlined">CLOSE</Button>
    </div> 
    );
};

SmartInvoiceDetails.propTypes={
  selectedData:PropTypes.object
}

export default SmartInvoiceDetails;


 

