import React, { useState, useEffect, useRef, useMemo } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Addtraining from "./Addtraining";
import Edittraining from "./Edittraining";
import Snackbar from '@mui/material/Snackbar';


export default function Trainings(){
  
    const[training, setTraining] = useState([]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => setTraining(responseData.content))
    }

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClose = () => {
        setOpen(false);
    }
    //Määritellään sarakkeet
    const columns = [
        {headerName: 'Date', field: 'date',
            cellRenderer: (data) => { return data.value ? (new Date(data.value)).toLocaleString() : ''}},
        {headerName: 'Duration', field: 'duration' },
        {headerName: 'Activity', field: 'activity' },
        {headerName: 'Edit', 
          sortable: false, 
          filter: false,
          floatingFilter: false,
          width: 100,
          cellRenderer: row => <Edittraining updateTraining={updateTraining} training={row.data}/>},
        {headerName: 'Delete', 
          field: 'id', 
          sortable: false, 
          filter: false,
          floatingFilter: false,
          width: 100, 
          cellRenderer: row => <Button size="small" variant="outlined" startIcon={<DeleteIcon />}  onClick={() => deleteTraining(row.data.links[0].href)}>Delete</Button> },
    ]
      
      const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .then (_ => {
          setMsg('Training Added');
          setOpen(true);
        })
        .catch(err => console.error(err))
      }

      const updateTraining = (training,link) => {
        fetch(link, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .then (_ => {
          setMsg('Training Updated');
          setOpen(true);
        })
        .catch(err => console.error(err))
      }
    
    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {
          method: 'DELETE',})
        .then (res => fetchData())
        .then (_ => {
          setMsg('Training Deleted');
          setOpen(true);
        })
        .catch(err => console.error(err))
        }
      };

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

    const gridRef = useRef();

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
                            Trainings
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Addtraining saveTraining={saveTraining}/>

            <AgGridReact
              ref={gridRef}
              defaultColDef={defaultColDef}
              onGridReady= { params => gridRef.current = params.api }
              animateRows={true}
              rowSelection={'single'}
              columnDefs={columns}
              rowData={training}
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