import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel"
import { Button, Checkbox, RadioGroup } from '@mui/material';
import jsPDF from 'jspdf';
import imgage from './assests/logo512.png';

const SmartInvoiceDetails = () => {

 const generatePDF = () => {
    var doc = new jsPDF('p', 'pt');
    
    doc.text(20, 20, 'This is the first title.')
    doc.addFont('helvetica', 'normal')
    doc.text(20, 60, 'This is the second title.')
    doc.text(20, 100, 'This is the thrid title.')      
    var img = new Image()
    img.src = imgage;
    doc.addImage(img, 'png', 10, 78, 12, 15)
    doc.save('demo.pdf')
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
    { id: 1, ticketNumber: '0123344444', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1},
    { id: 2, ticketNumber: '0123344454', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 3, ticketNumber: '0123344464', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 4, ticketNumber: '0123344449', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 5, ticketNumber: '0123343444', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 6, ticketNumber: '0143344444', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 7, ticketNumber: '0123344345', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 8, ticketNumber: '0123344446', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 9, ticketNumber: '0123344652', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1},
  ];
    return (
      <div style={{ height: 400, width: '100%' }}>
      
      <DataGrid
        rows={rows}
        columns={columns}       
        checkboxSelection
      />
     <Button variant="outlined" onClick={generatePDF}>GENERATE</Button> 
     <Button variant="outlined">CLOSE</Button>
    </div> 
    );
};



export default SmartInvoiceDetails;


 

