import React from 'react'; 
import { useState, useEffect } from 'react';
import { BarChart, Label } from 'recharts';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { fetchTrainings } from '../functions/fetching';
import _ from 'lodash';

export default function Activitychart (){
    const [trainings, setTrainings] = useState([]); 
    const [activityDuration, setActivityDuration] = useState([]); 

    useEffect(() => {
        const loadTrainings = async () => {
            try{
                const data = fetchTrainings(); 
                if (data){
                    setTrainings(data);    
                    console.log("fetching", data);
                }     
            } catch (error) {
                console.log("Error in fetching", error)
            }  
        }; 
        loadTrainings(); 
    }, [])
    

    useEffect(() =>{
        if (trainings.length > 0){
            console.log('check trainings', trainings); 
            const groupByActivity = _.groupBy(trainings, 'activity');  
            const totalDuration = Object.entries(groupByActivity).map(
                ([activity, items]) => ({ 
                    name: activity, 
                    duration: _.sumBy(items, 'duration')
                })
            );
            setActivityDuration(totalDuration) ; 
            console.log("Grouped Activities:", groupByActivity);
            console.log("Activity Durations:", totalDuration);
        } 
    }, [trainings]); 

    return(
        <div>
            <BarChart width={1000} height={700} data={activityDuration} margin={{top: 30, right: 30, bottom: 30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Total Durations of Activities by Minutes" offset={-20} position="insideBottom"/>
                </XAxis>
                <YAxis label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#5BC0EB" />
            </BarChart>
        </div>
    )
}