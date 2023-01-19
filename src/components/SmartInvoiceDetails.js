import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel"
import { RadioGroup } from '@mui/material';

const SmartInvoiceDetails = () => {


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ticketNumber', headerName: 'TicketNumber', width: 130 },
    { field: 'travel', headerName: 'Travel', width: 130 },
    {
      field: 'emdAirlineTax',
      headerName: 'EMD/AirlineTax',     
      width: 90,
      renderCell: (params) => (
        <RadioGroup>
           <FormLabel
          value="top"
          control={<Radio/>}
          label="EMD"          
        />
        </RadioGroup>
      )
    },
    {
      field: 'phonefee',
      headerName: 'Phone Fee',
      type: 'bool',
      width: 90,
    },
    {
      field: 'changefee',
      headerName: 'Change Fee',
      width: 90,
    },
  ];
  const rows = [
    { id: 1, ticketNumber: '0123344444', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1},
    { id: 2, ticketNumber: '0123344454', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 3, ticketNumber: '0123344464', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 4, ticketNumber: '0123344449', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 5, ticketNumber: '0123343444', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 6, ticketNumber: '0143344444', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 7, ticketNumber: '0123344445', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 8, ticketNumber: '0123344446', travel: 'International', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1 },
    { id: 9, ticketNumber: '0123344452', travel: 'Domestic', emdAirlineTax: 'EMD',phonefee:0 ,changefee:1},
  ];
    return (
      <div style={{ height: 400, width: '100%' }}>
      
      <DataGrid
        rows={rows}
        columns={columns}       
        checkboxSelection
      />
     
    </div> 
    );
};



export default SmartInvoiceDetails;


 

