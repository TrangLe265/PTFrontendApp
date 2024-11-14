import React from 'react'; 

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ActivityIcon from '@mui/icons-material/TrendingUp';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Home (){
    const menuItems = [
        { text: 'Customers', icon: <PeopleIcon />, introduction: 'All your customers’ contact info will be displayed here.' },
        { text: 'Trainings', icon: <FitnessCenterIcon />, introduction: 'All the planned trainings will be displayed here.' },
        { text: 'Calendar', icon: <CalendarTodayIcon />, introduction: 'Calendar view of your schedule will be displayed here.' },
        { text: 'Activity', icon: <ActivityIcon />, introduction: 'A visual presentation of different activities will be displayed here.' },
      ];

    return(
        
        <div>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{color:'#0B132B'}} gutterBottom>
            Welcome to 
            the Personal Trainer's Database App

          </Typography>
          <Divider sx={{ backgroundColor: '#FF82A9'}} />
          <Typography variant="h5" gutterBottom>

            This application is designed to assist personal trainers by providing a visual way to access important information. It can be used for self-monitoring or to give clients access to their schedules
          </Typography>
          
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#5BC0EB' , color: 'white'}}>
                    {item.icon} 
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={ <Typography variant="h5">{item.text}</Typography>}
                  secondary={<Typography variant="body">{item.introduction}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Container>
        </div>
    )
}