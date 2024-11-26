# Personal Trainer Frontend Application 🏋🏻‍♂️
## ✨ Overview
This project is a React-based frontend application designed for a personal trainer company to manage their customer database and training schedules. The application connects to a REST API to fetch and update customer and training information and includes features like filtering, sorting, and data visualization.
## ✨ Features
1. Customer Management
* View Customer List: Displays all customers with sorting and search capabilities.
* Add Customer: Form for adding new customer records.
* Edit Customer: Edit existing customer details.
* Delete Customer: Remove a customer with a confirmation dialog (Yes/No).
2. Training Management
* View Training List: Displays all training sessions with customer names, formatted dates (e.g., dd.mm.yyyy hh:mm), sorting, and search functionality.
* Add Training: Assign a training session to a customer using a date picker component for selecting exercise dates.
* Delete Training: Remove training records with a confirmation dialog (Yes/No).
3. Export Functionality
* Export customer data to a CSV file, ensuring only essential fields are included in the export.
4. Calendar Integration
* Calendar View: View all training sessions in monthly, weekly, and daily formats.
* Provides a consolidated overview of the schedule for easy management.
5. Bar Chart Visualization:
* Displays the total training duration for different activities.
* Utilizes the recharts library for creating the chart.
* Data Aggregation: Uses the lodash library for grouping data and calculating sums.
6. Deployment: available on [PTFrontendApp](https://trangle265.github.io/PTFrontendApp/)
  
  ![Homepage (1)](https://github.com/user-attachments/assets/59f5a4bb-6725-43d7-a310-34aa922d0bb2)
  ![CustomerList](https://github.com/user-attachments/assets/6c7299c5-53db-481b-849a-702a372a5664)
  ![ActivityChart](https://github.com/user-attachments/assets/e97f1b3c-23b4-4906-9717-eb75d3836baf)






## ✨ Library and Tools Used
* React: Frontend framework for building UI components.
* Lodash: Utility library for data aggregation (groupBy, sumBy).
* Recharts: Library for creating interactive charts.
* Date Picker: Component for user-friendly date selection.
* CSS Framework: Optional styling framework for responsive design.
