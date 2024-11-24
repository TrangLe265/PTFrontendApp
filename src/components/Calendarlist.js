import React from 'react'; 
import { useRef, useState, useEffect } from 'react';

import { fetchTrainings } from '../functions/fetching';
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
        const trainings = await fetchTrainings(); 
        const formatEvents = trainings.map(training => {
          const startDate = parse(training.date, "dd.MM.yyyy hh:mm a", new Date()); 
          const endDate = addMinutes(startDate, training.duration);

          return {
            title: `${training.activity}/${training.customer}`,
            start: format(startDate,"yyyy-MM-dd'T'HH:mm:ss"), 
            end: format(endDate, "yyyy-MM-dd'T'HH:mm:ss" ),
            allDay: false,
          }
        }); 
        setEvents(formatEvents);
        console.log('formatted events',formatEvents); 
      }catch(error){
        console.log('Error in fetching and formatting data: ', error);
      }
    }; 
    fetchEvents();  
    
  }, [])
  
  useEffect(() => { console.log('Events to display', events); }, [events]);

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
