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

export const editCustomer = (url,customer) => {
    return fetch(url, {
        method: 'PUT', 
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Error in updates: " + response.statusText)

        return response.json(); 

    })
}

export const saveCustomer = async (customer) => {
    if (!customer){
        console.error('There is no new customer to add.'); 
        return; 
    }
    try {
        const response = await fetch ('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers',
            {method: 'POST',
            headers:{'Content-Type' : 'application/json' },
            body: JSON.stringify(customer)
        });

        if (!response.ok){
            console.error('Failed to save new customer', response.status)
            return; 
        }
        
        console.log('New customer saved successfully.')
        return fetchCustomers(); 
        } catch(error) {
            console.error(error);
        }
}

export const fetchTrainings = async() => {
    try {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings'); 
        const data = await response.json(); 
        const trainings = data._embedded.trainings; 

        // Mapped all fetched trainings above to add the extra customer field 
        const trainedCustomer = await Promise.all(trainings.map( async (training) => {
            try {
                const customerDataResponse = await fetch(training._links.customer.href);
                if (!customerDataResponse){
                    console.log('Error in fetching customer data')
                };
                const customerData = await customerDataResponse.json(); 
                const trainingDate = training.date ? parseISO(training.date) : null ;

                return {
                    ...training, // Keeping all the previous data using spread operator
                    customer: `${customerData.firstname} ${customerData.lastname}`,
                    date: isValid(trainingDate) ? format(new Date(trainingDate), 'dd.MM.yyyy hh:mm a' ) : 'Invalid Date'
                };
            } catch (error) {
                console.log('Error in fetching: ', error);
                return {
                    ...training,
                    customer: 'Unknown Customer',
                    date: 'Invalid Date',
                };
            }
        }));
        
        return trainedCustomer;
    } catch (error) {
        console.log('Error in fetching: ', error);
        return [];
    } 
}

export const fetchTrainingWithCustomer = async () => {
    try {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
        const trainingWithCustomer = await response.json();
        return trainingWithCustomer;
    } catch (error) {
        console.log('Error in fetching: ', error);
        return [];
    }
}


export const deleteTraining = (url) => {
    return fetch(url, {method: 'DELETE'})
    .catch(err => console.error(err))
}

export const addTraining = async (training) => {
    if (!training){
        console.log("Please choose a customer to add training for."); 
        return; 
    }
    try{
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings',
            {method: 'POST',
            headers:{'Content-Type' : 'application/json' },
            body: JSON.stringify(training)
        })
        if (!response.ok){
            console.log('Error in saving new training: '); 
        }

        return response;

    } catch (error) {
        console.log('Error in saving new training: ', error);
        return null; 
    }

}