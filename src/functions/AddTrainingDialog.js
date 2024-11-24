import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import dayjs from 'dayjs';

import { addTraining } from './fetching';

export default function AddTrainingDialog({open, setOpen,  selectedCustomer}) {
    const [training, setTraining] =  useState({
        "date": "",
        "activity": "",
        "duration": "",
        "customer": "", 
    }); 

    const [selectedDate, setSelectedDate] = useState(dayjs()); 


    useEffect(() => {
        //if prevTraining is not used then the link is not updated to the Training object
        if (selectedCustomer && selectedCustomer._links?.self?.href){
            const newCustomerRef = selectedCustomer._links.self.href; 
            console.log(newCustomerRef); 
            setTraining(prevTraining => ({
                ...prevTraining,
                customer: newCustomerRef, 
            })); 
            
        }
    }, [selectedCustomer]); 

    const handleInputChange = (event) => {
        setTraining (prevTraining => ({
            ...prevTraining,
            [event.target.name] : event.target.value,
        }));
    };

    const handleDateChange = (newDate) => {
       setSelectedDate(newDate);  
       const isoDate = selectedDate.toISOString(); 
        setTraining((prevTraining) => ({
                ...prevTraining, 
                date: isoDate,
            }))
    }; 

    const handleAddTraining = async () => { 
        try {
            console.log(training)
            const response = await addTraining(training); 
            setOpen(false);
        
            setTraining({
                "date": "",
                "activity": "",
                "duration": "",
                "customer": "", 
            });
            if (response && response.ok){
                setTimeout(() => {
                    window.alert("New training added successfully.");
                }, 300); 
            }
               
        }catch (err) {
            console.error("Failed to add new training:", err);
        }    
    }

    return (
        <Dialog 
            open={open}
        >
             <DialogTitle>
                {"Add New Training"}
             </DialogTitle>
             <DialogContent>
                <DialogContentText style={{marginBottom: '20px'}}>
                    Please fill in the fields below
                </DialogContentText>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput= {(props) => <TextField {...props} fullWidth margin='dense/' variant="standard"required />}
                    />
                </LocalizationProvider>
            
                <TextField id="activity"
                    required
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={e => handleInputChange(e)}
                    label="Activity"
                    fullWidth
                    variant="standard"
                />
                <TextField id="duration"
                    required
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={e => handleInputChange(e)}
                    label="Duration"
                    fullWidth
                    variant="standard"
                />
             </DialogContent>
             <DialogActions>
                 <Button onClick={() => setOpen(false)}>Cancel</Button>
                 <Button onClick={handleAddTraining}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}