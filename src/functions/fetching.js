import { parseISO, isValid, format } from 'date-fns';

export const fetchCustomers = async() => {
  try{
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers'); 
    const data = await response.json();
    const customers = data._embedded.customers;
    return customers
  }
  catch(error){
    console.log('Error in fetching: ', error);
    return [];
  }
}

export const deleteCustomer = (url) => {
    return fetch(url, {method: 'DELETE'})
    .catch(err => console.error(err))
}

export const editCustomer = (id) => {}

export const fetchTrainings = async() => {
    try {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings'); 
        const data = await response.json(); 
        const trainings = data._embedded.trainings; 

        // Mapped all fetched trainings above to add the extra customer field 
        const trainedCustomer = await Promise.all(trainings.map(
            async (training) => {
                const customerDataResponse = await fetch(training._links.customer.href); 
                const trainingDate = parseISO(training.date);
                const customerData = await customerDataResponse.json(); 
                return {
                    ...training, // Keeping all the previous data using spread operator
                    customer: `${customerData.firstname} ${customerData.lastname}`,
                    date: isValid(trainingDate) ? format(new Date(trainingDate), 'dd.MM.yyyy hh:mm a' ) : 'Invalid Date'
                };
            }
        )); 
        
        return trainedCustomer;
    } catch (error) {
        console.log('Error in fetching: ', error);
        return [];
    } 
}

export const deleteTraining = (url) => {
    return fetch(url, {method: 'DELETE'})
    .catch(err => console.error(err))
}