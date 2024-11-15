
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import {deleteCustomer} from './fetching';

export default function DeleteCustomerDialog({open, setOpen, selectedCustomer, handleFetchCustomers}) {
    const handleDeleteCustomer = async () => { 
        if (! selectedCustomer){
            console.log("No customer selected for deletion.");
            return;
        }
        try {
            await deleteCustomer(selectedCustomer); 
            console.log(`Customer ${selectedCustomer} deleted successfully.`);
            setOpen(false);
            
            handleFetchCustomers(); 

            setTimeout(() => {
                window.alert("Customer deleted successfully.");
            }, 300);    
        }catch (err) {
            console.error("Failed to delete customer:", err);
        }    
    }

    return (
        <Dialog open={open}>
             <DialogTitle>
                {"Continue with deleting this customer's information in the database?"}
             </DialogTitle>
             <DialogActions>
                 <Button onClick={() => setOpen(false)}>Cancel</Button>
                 <Button onClick={handleDeleteCustomer} autoFocus>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}