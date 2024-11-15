import React, {useState,useEffect} from 'react'; 

import IconButton from '@mui/material/Button'; 
import DeleteIcon from '@mui/icons-material/Delete';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '../styling/index.css';

import { Snackbar, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid2';

import {fetchTrainings,deleteTraining} from '../functions/fetching';

export default function Traininglist(){
    
    const [trainings, setTrainings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);

    const [columnsDefs, setColumnDefs] = useState([
        {headerName:'Action', flex:1,
            cellRenderer: params =>
                (<IconButton 
                    aria-label='delete' 
                    color='white' 
                    onClick={() => handleDeleteTraining(params.data._links.self.href)}> 
                    <DeleteIcon /> 
                </IconButton>)
        },
        {field: 'activity', flex:2},
        {field: 'date',  flex:2},
        {field: 'duration',headerName: 'Duration (min)',flex:1},
        {field: 'customer', flex:1},
    ])


    useEffect(() => {handleFetchTrainings()}, []); 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleFetchTrainings = async () => {
        try {
            const data = await fetchTrainings();
            console.log(data);
            setTrainings(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteTraining = (url) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            deleteTraining(url)
            .then(() => {
                handleFetchTrainings();
                setOpen(true);
            })
            .catch((err) => console.error(err));
        }
    }

    const filteredTrainings = trainings.filter(
        (training) => training.activity.toLowerCase().includes(searchQuery.toLowerCase()) || training.customer.toLowerCase().includes(searchQuery.toLowerCase()));

    return(
        <> 
            <Box sx={{ flexGrow: 1 , marginBottom: '10px'}}>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Typography variant="h3" sx={{color:'#0B132B'}}>Trainings List</Typography>  
                </Grid>
                <Grid size={8}>
                    <TextField fullWidth label="Search" variant="outlined"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{marginBottom:'10px'}}
                    />
                </Grid>      
            </Grid>
            </Box>
  
            <div className='ag-theme-quartz-dark' style={{height:'500px'}} >
                <AgGridReact
                    rowData = {filteredTrainings}
                    columnDefs={columnsDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true }
                />
            </div>
            <Snackbar 
                open = {open}
                autoHideDuration={3000}
                onClose = {() => setOpen(false)}
                message = 'Training deleted successfully'
            />
        </>
    )
}