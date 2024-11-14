import React from 'react';
import ReactDOM from 'react-dom/client';
import { provideGlobalGridOptions } from 'ag-grid-community';
import './styling/index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import reportWebVitals from './reportWebVitals';


provideGlobalGridOptions({
  defaultColDef: {
    resizable: true,   // Makes columns resizable by default
    filter: true,      // Enable filtering by default
    sortable: true,    // Enable sorting by default
    cellStyle: {
      fontSize: '16px', // Default font size for cells
    },
    headerClass: 'custom-header-class', 
  },
  rowHeight: 60,          // Set default row height
  headerHeight: 80,      // Set default header height
  paginationPageSize: 8, // Set default pagination size
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <CssBaseline/>
      <App />
   
  </React.StrictMode>
);

reportWebVitals();
