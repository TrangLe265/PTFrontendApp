import React from 'react'; 
import { useState, useEffect } from 'react';
import { BarChart, Label } from 'recharts';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { fetchTrainingWithCustomer } from '../functions/fetching';
import _ from 'lodash';

export default function Activitychart (){
 
    const [activityDuration, setActivityDuration] = useState([]); 

    useEffect(() => {
        const loadTrainings = async () => {
            try{
                const data = await fetchTrainingWithCustomer(); 
                if (data && data.length > 0){
         
                    console.log("fetching", data);
                    const groupByActivity = _.groupBy(data, 'activity');  
                    console.log("Grouped Activities:", groupByActivity);
                    const totalDuration = Object.entries(groupByActivity).map(
                        ([activity, items]) => ({ 
                            name: activity, 
                            duration: _.sumBy(items, 'duration')
                        })
            );
            setActivityDuration(totalDuration) ; 
            console.log("Grouped Activities:", groupByActivity);
            console.log("Activity Durations:", totalDuration);
                }else{
                    console.log("Nothing fetched");
                }    
            } catch (error) {
                console.log("Error in fetching", error)
            }  
        }; 
        loadTrainings(); 
    }, [])

    return(
        <div style={{alignContent: 'center'}}>
            <BarChart width={1000} height={800} data={activityDuration} margin={{top: 30, right: 30, left: 80,bottom: 30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Total Durations of Activities by Minutes" offset={-40} position="insideBottom"/>
                </XAxis>
                <YAxis label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#5BC0EB" />
            </BarChart>
        </div>
    )
}