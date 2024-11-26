import React from 'react';
import ReactDOM from 'react-dom/client';
import { provideGlobalGridOptions } from 'ag-grid-community';
import './styling/index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

provideGlobalGridOptions({
  defaultColDef: {
    resizable: true,   
    filter: true,      
    sortable: true,   
    cellStyle: {
      fontSize: '16px', 
    },
    headerClass: 'custom-header-class', 
  },
  rowHeight: 60,          
  headerHeight: 80,      
  paginationPageSize: 8, 
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <CssBaseline/>
      <App />
   
  </React.StrictMode>
);
