import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { XAxis, YAxis, BarChart, Tooltip, CartesianGrid, Bar, Legend } from 'recharts';
import { _ } from 'lodash';


export default function Chart(){

    const[training, setTraining] = useState([]);
    const _ = require("lodash"); 
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => setTraining(responseData.content))
    }
    
    const data = _(training)
    .groupBy('activity')
    .map((training, i) => ({
        name: i,
        training: _.sumBy(training, 'duration')
    }))
    .value()

    useEffect(() => fetchData(), []);

    return (
        <div
        className="ag-theme-material"
        style={{
          height: '700px',
          width: '80%',
          margin: 'auto',
        }}
        >
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Training chart
                    </Typography>
                </Toolbar>
            </AppBar>
            </Box>
            <BarChart style={{margin: 'auto'}} width={1000} height={350} margin={{top:15}} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="training" fill="#1976d2" />
            </BarChart>
        </div>
    )
}