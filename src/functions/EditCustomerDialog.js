import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { editCustomer } from './fetching';

export default function EditCustomerDialog({open, setOpen, selectedCustomer, handleFetchCustomers}) {
    const [customer, setCustomer] = useState({
        "firstname": '',
        "lastname": "",
        "email": "",
        "phone": "",
        "streetaddress": "",
        "postcode": "",
        "city": ""
    }); 
    const [url, setUrl] = useState(null); 

    useEffect(() => {
        if(selectedCustomer){
            setCustomer({
                "firstname": selectedCustomer.firstname,
                "lastname": selectedCustomer.lastname,
                "email": selectedCustomer.email,
                "phone": selectedCustomer.phone,
                "streetaddress": selectedCustomer.streetaddress,
                "postcode": selectedCustomer.postcode,
                "city": selectedCustomer.city
            }); 
            setUrl(selectedCustomer._links.self.href); 
        }
    }, [selectedCustomer]); 


    const handleInputChange = (event) => {
        setCustomer ({...customer, [event.target.name] : event.target.value})
    }

    const handleEditCustomer = async () => { 
        console.log(customer); 
        console.log(url); 
        
        try {
            const response = await editCustomer(url, customer); 
            console.log(url); 
            setOpen(false);
            
            handleFetchCustomers(); 

            if (response && response.ok){
                setTimeout(() => {
                    window.alert("Info edited successfully.");
                }, 300);  
            }
              
        }catch (err) {
            console.error("Failed to edit customer info:", err);
        }    
    }

    return (
        <Dialog 
            open={open}
        >
             <DialogTitle>
                {"Edit Customer"}
             </DialogTitle>
             <DialogContent>
                <TextField id="fname"
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={e => handleInputChange(e)}
                    label="First name"
                    fullWidth
                    variant="standard"
                />
                <TextField id="lname"
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Last name"
                    fullWidth
                    variant="standard"
                />
                <TextField id="email"
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField id="phone"
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone number"
                    fullWidth
                    variant="standard"
                />
                <TextField id="name"
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Street address"
                    fullWidth
                    variant="standard"
                />
                <TextField id="postcode"
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                <TextField id="city"
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
                 <Button onClick={handleEditCustomer}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}