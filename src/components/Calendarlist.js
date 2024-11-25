import React from 'react'; 
import { useState, useEffect } from 'react';

import { fetchTrainingWithCustomer } from '../functions/fetching';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid' ;
import timeGridPlugin from '@fullcalendar/timegrid'; 
import listPlugin from '@fullcalendar/list'; 
import { addMinutes, format, parse } from 'date-fns';

export default function Calendarlist(){
  const [events,setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async() => {
      try {
        const trainings = await fetchTrainingWithCustomer(); 
        const formatEvents = trainings.map(training => {
            if (!training.customer || !training.date || !training.duration) {
              console.warn('Missing data')
              return null;
            }
            const startDate = new Date(training.date); 
            const endDate = addMinutes(startDate, training.duration);

            return {
              title: `${training.activity}/${training.customer.firstname} ${training.customer.lastname}`,
              start: format(startDate,"yyyy-MM-dd'T'HH:mm:ss"), 
              end: format(endDate, "yyyy-MM-dd'T'HH:mm:ss" ),
              allDay: false,
            }
        }).filter(event => event !== null); 
        setEvents(formatEvents);
        console.log('formatted events',formatEvents); 
      }catch(error){
        console.log('Error in fetching and formatting data: ', error);
      }
    }; 
    fetchEvents();  
    
  }, [])
  
  useEffect(() => { console.log('Events to display', events); }, [events]); //force useEffect another time to make sure events are assigned

  return(
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
      initialView="dayGridMonth"
      weekends={true}
      headerToolbar={
        {left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
      }}
      events={events}
    />
    )
}
