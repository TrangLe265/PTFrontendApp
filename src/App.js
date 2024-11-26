import './styling/App.css';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import Traininglist from './components/Traininglist';
import Customerlist from './components/Customerslist';
import Calendarlist from './components/Calendarlist';
import Activitychart from './components/Activitychart'; 

import NavDrawer from './NavDrawer';

function App() {
  

  return (
    <Router>
      <Container maxWidth="xl">  
        <NavDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customerlist />} />
          <Route path="/trainings" element={<Traininglist />} />
          <Route path="/calendar" element={<Calendarlist />} />
          <Route path="/activity" element={<Activitychart />} />
        </Routes>
        
      </Container>
    </Router>
  );
}

export default App;
