import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel"
import { Button, Checkbox, RadioGroup ,Stack} from '@mui/material';
import WebJetInvoicePDF from '../WebJetInvoicePDF';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PropTypes from 'prop-types';

const SmartInvoiceDetails = () => {

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toBeDeleted, setToBeDeleted] = React.useState(false);
 const generatePDF = (invoiceData) => {
 console.log(selectedRows.ticketNumber);
 invoiceData=selectedRows; 
 WebJetInvoicePDF(invoiceData,'WebJetInvoice.pdf') ; 
}

const close=()=>{
  setToBeDeleted(true);
}

const handleClosDeleteDialog = () => {
  setToBeDeleted(false);
}
const handleDelete =()=>{
  window.close();
}
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ticketNumber', headerName: 'TicketNumber', width: 180 },
    {field :'flightDetail'},
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
    { id: 1, ticketNumber:'122433343444',ticketDetails: [{paxname:'MEYERS/BELINDA JAY MISS',flight:'Flight 1 - 08-11-2023 06:00 QF 401 (E) SYDNEY > MELBOURNE'},
    {paxname:'MEYERS/BELINDA JAY MR',flight:'Flight 1 - 08-11-2023 06:00 QF 401 (E) SYDNEY > MELBOURNE'}],
     travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1,
     flightDetail:'Flight 1 - 08-11-2023 06:00 QF 401 (E) SYDNEY > MELBOURNE'},
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
      <div style={{ height: 500, width: '80%' }}>
      
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
          const selectedRows = rows.filter((row) =>
            selectedIDs.has(row.id),
          );

          setSelectedRows(selectedRows);
        }}
        {...rows}
      />
       <Stack direction="row" justifyContent="center" spacing={2} >
     <Button variant="outlined" onClick={generatePDF}>GENERATE</Button> 
     <Button variant="outlined"onClick={close}>CLOSE</Button>
   </Stack>
    <Dialog
      open={toBeDeleted}
      onClose={handleClosDeleteDialog}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{ cursor: 'move' }}
        id="draggable-dialog-title"
      >
        {('Are You Sure Want To Close The Page')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {('Are You Sure Want To Close The Page')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="primary">
          OK
        </Button>
        <Button autoFocus onClick={handleClosDeleteDialog} color="primary">
          {('Cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
    
    ); 
    
};

SmartInvoiceDetails.propTypes={
  selectedData:PropTypes.object
}

export default SmartInvoiceDetails;


 

