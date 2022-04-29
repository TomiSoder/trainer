import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Edittraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: ''
      }
    )
    
      const handleClickOpen = () => {
        setTraining({
            date: props.training.date,
            duration: props.training.duration,
            activity: props.training.activity
        })
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      //e = event
      const handleInputChange = (e) =>{
        setTraining({...training, [e.target.name]: e.target.value })
      }

      const updateTraining = () => {
        props.updateTraining(training, props.training.links[0].href);
        handleClose();
      }

    return(
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="Date"
            fullWidth
          />
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
          <Button onClick={updateTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}