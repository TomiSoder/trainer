import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import moment from 'moment';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Calendar() {

  const [training, setTraining] = useState([]);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(responseData => setTraining(responseData.content))
}

  useEffect(() => fetchData(), []);

  const monthSettings =
    {
    weekDays: [0, 1, 2, 3, 4, 5, 6], 
    weekStartOn: 1, 
    startHour: 6, 
    endHour: 23,
    }

  const weekSettings =
    { 
    weekDays: [0, 1, 2, 3, 4, 5, 6], 
    weekStartOn: 1, 
    startHour: 6, 
    endHour: 23,
    step: 60
    }
  

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
                  Training calendar
              </Typography>
          </Toolbar>
      </AppBar>
      </Box>
      
      <Scheduler
        view="week"
        events={training.map((training, i) =>({
          event_id: i,
          title: training.activity,
          start: new Date(training.date),
          end: moment(training.date).add(training.duration, 'minute')._d,
        }))}
        selectedDate={new Date(moment())}
        week={weekSettings}
        month={monthSettings}
      />
      </div>
  );
}