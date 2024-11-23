import React, {useState,useEffect} from 'react'; 

import IconButton from '@mui/material/Button'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '../styling/index.css';

import { Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid2';

import {fetchCustomers} from '../functions/fetching';
import DeleteCustomerDialog from '../functions/DeleteCustomerDialog';
import AddCustomerDialog from '../functions/AddCustomerDialog'; 
import EditCustomerDialog from '../functions/EditCustomerDialog';
import AddTrainingDialog from '../functions/AddTrainingDialog';

export default function Customerlist(){
    const [customer, setCustomer] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "phone": "",
        "streetaddress": "",
        "postcode": "",
        "city": ""
    });  

    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [customerToEdit, setCustomerToEdit] = useState(null); 
    const [openEditDialog,setOpenEditDialog] = useState(false); 

    const [openAddTrainingDialog, setOpenAddTrainingDialog] = useState(false); 
    const [trainedCustomer, setTrainedCustomer] = useState(null); 

    const [columnDefs, setColumnDefs] = useState([
        {headerName:'Action', width: 300, sortable: false, editable: false, filterable: false,
        cellRenderer: params => (
        <div> 
            <IconButton 
                aria-label='delete' 
                color='white' 
                onClick={() => handleConfirmDelete(params.data._links.self.href)}> 
                <DeleteIcon /> 
            </IconButton>
            <IconButton 
                aria-label='edit' 
                color='white' 
                onClick={() => handleEditCustomer(params.data)}> 
                <EditIcon />    
            </IconButton>
            <Button 
                variant="text" 
                onClick={() => {
                    handleAddTraining(params.data);
                    console.log(params.data); 
                }}
            >
                Add training
            </Button>
        </div>)      
    },
    {
        headerName: 'Name',
        valueGetter: params => `${params.data.firstname} ${params.data.lastname}`,
        flex: 2, 
        editable: true,
    },
    {field: 'email',  flex:2, editable: true},
    {field: 'phone',  flex:2, editable: true},
    {field: 'streetaddress',headerName: 'Address',flex:2, editable: true},
    {field: 'postcode', flex:1, editable: true},
    {field: 'city', flex:1, editable: true},
]);

    useEffect(() => {handleFetchCustomers()}, []);

    const handleFetchCustomers = async () => {
        try {
            const data = await fetchCustomers();
            console.log(data);
            setCustomers(data);
        } catch (err) {
            console.error(err);
        }
    }
    
    const handleAddCustomer = () => {
        setOpenAddDialog(true); 
    }

    const handleConfirmDelete = (url) => {
        setCustomerToDelete(url);
        console.log(`Selected customer for deletion: ${url}`);
        setOpenDeleteDialog(true);
    }

    const handleEditCustomer = (customer) => {
        setCustomerToEdit(customer); 
        setOpenEditDialog(true); 
    }

    const handleAddTraining = (customer) => {   
        setOpenAddTrainingDialog(true); 
        setTrainedCustomer(customer);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredCustomer = customers.filter(
        (customer) => customer.firstname.toLowerCase().includes(searchQuery.toLowerCase()) || customer.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <>
            <Box sx={{ flexGrow: 1 , marginBottom: '10px'}}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Typography variant="h3" sx={{color:'#0B132B'}}>Customers List</Typography>  
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label="Search" variant="outlined"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{marginBottom:'10px'}}
                        />
                    </Grid> 
                    <Button 
                        variant="contained" 
                        color="primary" size="large" 
                        onClick={() => handleAddCustomer()}
                        style={{marginBottom:'10px'}}>
                            Add Customer
                    </Button>     
                </Grid>
            </Box>
            <div className='ag-theme-quartz-dark' style={{height:'500px'}} >
                <AgGridReact
                    rowData = {filteredCustomer}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true }
                    onGridReady={params => {
                        params.api.sizeColumnsToFit();
                    }}
                />
            </div>
            <DeleteCustomerDialog 
                open={openDeleteDialog} 
                setOpen={setOpenDeleteDialog} 
                selectedCustomer={customerToDelete} 
                handleFetchCustomers={handleFetchCustomers} 
            />
            <AddCustomerDialog 
                open={openAddDialog} 
                setOpen={setOpenAddDialog} 
                handleFetchCustomers={handleFetchCustomers} 
            />
            <EditCustomerDialog
                open={openEditDialog} 
                setOpen={setOpenEditDialog} 
                selectedCustomer={customerToEdit} 
                handleFetchCustomers={handleFetchCustomers} 
            />
            <AddTrainingDialog 
                open={openAddTrainingDialog} 
                setOpen={setOpenAddTrainingDialog}
                selectedCustomer ={trainedCustomer}
            />
        </>
        
    )
}
