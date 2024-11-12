import React, {useState,useEffect} from 'react'; 

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { format, isValid, parseISO } from 'date-fns';

export default function Traininglist(){
    const [trainings, setTrainings] = useState([]);

    const [columnsDefs, setColumnDefs] = useState([
        {field: 'Actions', width: 150},
        {field: 'activity', filter: true, width: 200},
        {field: 'date', filter: true},
        {field: 'duration',filter: true, width: 150},
        {field: 'customer',filter: true},
    ])

    useEffect(() => {fetchData()}, []); 

    const fetchData = async () => {
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
            <div className='ag-theme-material-dark' style={{height:800}}>
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
