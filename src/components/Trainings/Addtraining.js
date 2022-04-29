import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function Addtraining(props) {

      const [open, setOpen] = useState(false);
      const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: props.training
        }
      )
      const [selectedDate, setSelectedDate] = useState(new Date());

      const setDate = (date) => {
        setSelectedDate(date);
        setTraining({...training, date: date.toISOString()})
      }

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      //e = event
      const handleInputChange = (e) =>{
        setTraining({...training, [e.target.name]: e.target.value })
      }

      const addTraining = () => {
        props.saveTraining(training);
        console.log(training);
        handleClose()
      }

    return(
    <div>
      <Button style={{margin: 0}}  variant="outlined" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new training</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>

        <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            autoFocus
            margin="dense"
            name="date"
            label="Date and time"
            value={training.date}
            onChange={date => setDate(date)}
            fullWidth
      />
        </LocalizationProvider>
        
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}