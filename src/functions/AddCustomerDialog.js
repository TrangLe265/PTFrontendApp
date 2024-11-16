import * as React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { saveCustomer } from './fetching';

export default function AddCustomerDialog({open, setOpen, handleFetchCustomers}) {
    const [customer, setCustomer] =  useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "phone": "",
        "streetaddress": "",
        "postcode": "",
        "city": ""
    }); 

    const handleInputChange = (event) => {
        setCustomer ({...customer, [event.target.name] : event.target.value})
    }

    const handleAddCustomer = async () => { 
        if (! customer){
            console.log("No new customer info to add.");
            return;
        }
        try {
            await saveCustomer(customer); 
            console.log('New customer added successfully.');
            setOpen(false);
            
            handleFetchCustomers(); 

            setCustomer({
                "firstname": "",
                "lastname": "",
                "email": "",
                "phone": "",
                "streetaddress": "",
                "postcode": "",
                "city": ""
            });

            setTimeout(() => {
                window.alert("Customer added successfully.");
            }, 300);    
        }catch (err) {
            console.error("Failed to add new customer:", err);
        }    
    }

    return (
        <Dialog 
            open={open}
        >
             <DialogTitle>
                {"Add New Customer"}
             </DialogTitle>
             <DialogContent>
                <DialogContentText>
                    Please fill in the fields below
                </DialogContentText>
                <TextField id="fname"
                    autoFocus
                    required
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={e => handleInputChange(e)}
                    label="First name"
                    fullWidth
                    variant="standard"
                />
                <TextField id="lname"
                    required
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Last name"
                    fullWidth
                    variant="standard"
                />
                <TextField id="email"
                    required
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField id="phone"
                    required
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone number"
                    fullWidth
                    variant="standard"
                />
                <TextField id="name"
                    required
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Street address"
                    fullWidth
                    variant="standard"
                />
                <TextField id="postcode"
                    required
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                <TextField id="city"
                    required
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    fullWidth
                    variant="standard"
                />

             </DialogContent>
             <DialogActions>
                 <Button onClick={() => setOpen(false)}>Cancel</Button>
                 <Button onClick={handleAddCustomer}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}