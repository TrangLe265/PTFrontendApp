
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import {deleteTraining} from './fetching';

export default function DeleteTrainingDialog({open, setOpen, selectedTraining, handleFetchTrainings}) {
    const handleDeleteTraining = async () => { 
        if (! selectedTraining){
            console.log("No training selected for deletion.");
            return;
        }
        try {
            const response = await deleteTraining(selectedTraining); 
            setOpen(false);
            
            handleFetchTrainings(); 

            if (response && response.ok){
                setTimeout(() => {
                    window.alert("Training deleted successfully.");
                }, 300);    
            }
            
        }catch (err) {
            console.error("Failed to delete training:", err);
        }    
    }

    return (
        <Dialog open={open}>
             <DialogTitle>
                {"Do you want to delete this training from the database?"}
             </DialogTitle>
             <DialogActions>
                 <Button onClick={() => setOpen(false)}>Cancel</Button>
                 <Button onClick={handleDeleteTraining} autoFocus>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}