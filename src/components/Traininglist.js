import React, {useState,useEffect} from 'react'; 

import IconButton from '@mui/material/Button'; 
import DeleteIcon from '@mui/icons-material/Delete';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '../styling/index.css';

import { format, isValid, parseISO } from 'date-fns';

export default function Traininglist(){
    
    const [trainings, setTrainings] = useState([]);

    const [columnsDefs, setColumnDefs] = useState([
        {headerName:'Action', flex:1,
            cellRenderer: params => DeleteButton(params.data._links.self.href)
        },
        {field: 'activity', flex:2},
        {field: 'date',  flex:2},
        {field: 'duration',headerName: 'Duration (min)',flex:1},
        {field: 'customer', flex:1},
    ])

    const DeleteButton = (url) => {
        return <IconButton aria-label='delete' color='white' onClick={() => deleteTraining(url)}> <DeleteIcon /> </IconButton>
    }
    
    const deleteTraining = (url) => {
        fetch(url, {method: 'DELETE'})
        .then(res => fetchTrainings())
        .catch(err => console.error(err))
        console.log(url); 
    }


    useEffect(() => {fetchTrainings()}, []); 

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings'); 
            const data = await response.json(); 
            const trainings = data._embedded.trainings; 

            //mapped all fetched trainings above to add the extra customer field 
            const trainedCustomer = await Promise.all(trainings.map(
                async (training) => {
                    const customerDataResponse = await fetch(training._links.customer.href); 
                    const trainingDate = parseISO(training.date)
                    const customerData = await customerDataResponse.json(); 
                    return {
                        ...training, //keeping all the previous data using spread operator
                        customer: `${customerData.firstname} ${customerData.lastname}`,
                        date: isValid(trainingDate) ? format(new Date(trainingDate), 'dd.MM.yyyy hh:mm a' ) : 'Invalid Date'
                    }
                })); 
                setTrainings(trainedCustomer); 
        } catch (error) {
            console.log('Error in fetching: ', error);
        } 
    }; 

    console.log(trainings); 

    return(
        <>
            <div className='ag-theme-quartz-dark' style={{height:'500px'}} >
                <AgGridReact
                    rowData = {trainings}
                    columnDefs={columnsDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true }
                />
                
            </div>
        </>
    )
}
