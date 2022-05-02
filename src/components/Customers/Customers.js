import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import Addtraining from "../Trainings/Addtraining";
import Snackbar from '@mui/material/Snackbar';


export default function Customers(){
  
    const[customers, setCustomers] = useState([]);
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
    }
    
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    const onBtnExport = useCallback(() => {
      gridRef.current.api.exportDataAsCsv();
  }, []);

    const handleClose = () => {
      setOpen(false);
  }

    //Määritellään sarakkeet
    const columns = [
        {headerName: 'Firstname', field: 'firstname' },
        {headerName: 'Lastname', field: 'lastname' },
        {headerName: 'Address', field: 'streetaddress' },
        {headerName: 'Postcode', field: 'postcode' },
        {headerName: 'City', field: 'city' },
        {headerName: 'Email', field: 'email' },
        {headerName: 'Phone', field: 'phone' },
        {headerName: 'Trainings', 
          sortable: false, 
          filter: false,
          floatingFilter: false,
          width: 250,
          cellRenderer: row => <Addtraining saveTraining={saveTraining} training={row.data.links[0].href} />
          },
        {headerName: 'Edit', 
          sortable: false, 
          filter: false,
          floatingFilter: false,
          width: 100,
          cellRenderer: row => <Editcustomer updateCustomer={updateCustomer} customer={row.data}/>},
        {headerName: 'Delete', 
          sortable: false,
          filter: false,
          floatingFilter: false,
          width: 100, 
          cellRenderer: row => <Button size="small" variant="outlined" startIcon={<DeleteIcon />}  onClick={() => deleteCustomer(row.data.links[0].href)}>Delete</Button> },
    ]

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .then (_ => {
          setMsg('Customer Added');
          setOpen(true);
        })
        .catch(err => console.error(err))
      }

      const updateCustomer = (customer,link) => {
        fetch(link, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .then (_ => {
          setMsg('Customer Updated');
          setOpen(true);
        })
        .catch(err => console.error(err))
      }

      const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {
          method: 'DELETE',})
        .then (res => fetchData())
        .then (_ => {
          setMsg('Customer Deleted');
          setOpen(true);
        })
        .catch(err => console.error(err))
        }
      };

      const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .then(_ => setMsg('Training added to customer'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
    }

    const defaultColDef = useMemo(() => {
        return {
          editable: true,
          sortable: true,
          flex: 1,
          minWidth: 100,
          filter: true,
          floatingFilter: true,
          resizable: true,
        };
      }, []);

    useEffect(() => fetchData(), []);

    return (
      
      <div
        className="ag-theme-material"
        style={{
          height: '700px',
          width: '80%',
          margin: 'auto' }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Customers
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Addcustomer saveCustomer={saveCustomer}/>

            <Button style={{margin: 5}}  variant="outlined" onClick={onBtnExport}>Export .csv file</Button>

            <AgGridReact
                ref={gridRef}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection={'single'}
                columnDefs={columns}
                rowData={customers}
                >
            </AgGridReact>
            
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'                
                }}
              />
        </div>
    )
}