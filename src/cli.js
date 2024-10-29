#!/usr/bin/env node
const axios = require('axios');
const readline = require('readline');

// Configure the API base URL
const BASE_URL = 'http://localhost:3000';

// Set up readline for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the menu options
function showMenu() {
    console.log(`
  Car Configurator CLI
  =====================
  1. Add a new vehicle
  2. View all vehicles
  3. Delete a vehicle
  4. Add a new configuration
  5. View all configurations
  6. Delete a configuration
  7. Exit
  `);
    rl.question('Choose an option: ', handleMenu);
}

// Function to handle menu selection
async function handleMenu(option) {
    switch (option) {
        case '1':
            await addVehicle();
            break;
        case '2':
            await viewVehicles();
            break;
        case '3':
            await deleteVehicle();
            break;
        case '4':
            await addConfiguration();
            break;
        case '5':
            await viewConfigurations();
            break;
        case '6':
            await deleteConfiguration();
            break;
        case '7':
            console.log('Exiting CLI...');
            rl.close();
            return;
        default:
            console.log('Invalid option, please try again.');
            showMenu(); // Show menu immediately for invalid input
    }
}

// Function to add a new vehicle
async function addVehicle() {
    rl.question('Enter vehicle type (Car/Motorcycle): ', (type) => {
        rl.question('Enter vehicle brand: ', (brand) => {
            rl.question('Enter vehicle model: ', (model) => {
                rl.question('Enter motor options (comma-separated): ', (motorOptions) => {
                    rl.question('Enter rim options (comma-separated): ', (rimOptions) => {
                        rl.question('Enter color options (comma-separated): ', (colorOptions) => {
                            rl.question('Enter production year: ', async (productionYear) => {
                                try {
                                    const response = await axios.post(`${BASE_URL}/vehicles`, {
                                        type,
                                        brand,
                                        model,
                                        motorOptions: motorOptions.split(','),
                                        rimOptions: rimOptions.split(','),
                                        colorOptions: colorOptions.split(','),
                                        productionYear: parseInt(productionYear)
                                    });
                                    console.log('Vehicle added:', response.data);
                                    showMenu();
                                } catch (error) {
                                    console.error('Error adding vehicle:', error.response ? error.response.data : error.message);
                                }

                            });
                        });
                    });
                });
            });
        });
    });
}

// Function to view all vehicles
async function viewVehicles() {
    // Prompt for filter and sorting options
    rl.question('Filter by type (Car/Motorcycle or leave blank): ', (type) => {
        rl.question('Filter by brand (e.g., Honda or leave blank): ', (brand) => {
            rl.question('Filter by model (e.g., Civic or leave blank): ', (model) => {
                rl.question('Sort by field (e.g., productionYear, brand or leave blank): ', (sortBy) => {
                    rl.question('Sort order (asc/desc or leave blank for default asc): ', (order) => {

                        // Build query string based on user input
                        const params = new URLSearchParams();

                        if (type) params.append('type', type);
                        if (brand) params.append('brand', brand);
                        if (model) params.append('model', model);
                        if (sortBy) params.append('sortBy', sortBy);
                        if (order) params.append('order', order);

                        // Send GET request with query parameters
                        axios.get(`${BASE_URL}/vehicles?${params.toString()}`)
                            .then(response => {
                                console.log('Vehicles:', response.data);
                            })
                            .catch(error => {
                                console.error('Error retrieving vehicles:', error.response ? error.response.data : error.message);
                            })
                            .finally(() => {
                                showMenu();
                            });

                    });
                });
            });
        });
    });
}



// Function to delete a vehicle
async function deleteVehicle() {
    try {
        // Step 1: Retrieve and display all vehicles
        const response = await axios.get(`${BASE_URL}/vehicles`);
        const vehicles = response.data;

        if (vehicles.length === 0) {
            console.log('No vehicles found to delete.');
            showMenu();
            return;
        }

        console.log('Vehicles:');
        vehicles.forEach(vehicle => {
            console.log(`ID: ${vehicle.id}, Type: ${vehicle.type}, Brand: ${vehicle.brand}, Model: ${vehicle.model}`);
        });

        // Step 2: Ask the user for the vehicle ID to delete
        rl.question('Enter the vehicle ID to delete: ', async (id) => {
            try {
                const deleteResponse = await axios.delete(`${BASE_URL}/vehicles/${id}`);
                console.log(deleteResponse.data.message);
            } catch (error) {
                console.error('Error deleting vehicle:', error.response ? error.response.data : error.message);
            }
            // Show menu again after deletion
            showMenu();
        });
    } catch (error) {
        console.error('Error retrieving vehicles:', error.response ? error.response.data : error.message);
        showMenu();
    }
}

// Function to add a new configuration
async function addConfiguration() {
    rl.question('Enter vehicle ID for the configuration: ', async (vehicleId) => {
        try {
            // Step 1: Retrieve the vehicle entry to get color and rim options
            const vehicleResponse = await axios.get(`${BASE_URL}/vehicles/${vehicleId}`);
            const vehicle = vehicleResponse.data;

            if (!vehicle) {
                console.log('Vehicle not found.');
                showMenu();
                return;
            }

            // Step 2: Display available color and rim options
            console.log(`Available colors: ${vehicle.colorOptions.join(', ')}`);
            console.log(`Available rims: ${vehicle.rimOptions.join(', ')}`);

            // Step 3: Prompt for color and rim choices
            rl.question('Choose a color from the options above: ', (color) => {
                if (!vehicle.colorOptions.includes(color)) {
                    console.log('Invalid color choice.');
                    showMenu();
                    return;
                }

                rl.question('Choose a rim from the options above: ', (rim) => {
                    if (!vehicle.rimOptions.includes(rim)) {
                        console.log('Invalid rim choice.');
                        showMenu();
                        return;
                    }

                    // Step 4: Prompt for remaining configuration details
                    rl.question('Enter price: ', (price) => {
                        rl.question('Enter delivery address: ', (deliveryAddress) => {
                            rl.question('Enter payment method: ', async (paymentMethod) => {
                                try {
                                    // Step 5: Create the configuration
                                    const configResponse = await axios.post(`${BASE_URL}/configurations`, {
                                        vehicleId: parseInt(vehicleId),
                                        color,
                                        rim,
                                        price: parseFloat(price),
                                        deliveryAddress,
                                        paymentMethod
                                    });
                                    console.log('Configuration added:', configResponse.data);
                                } catch (error) {
                                    console.error('Error adding configuration:', error.response ? error.response.data : error.message);
                                }
                                showMenu();
                            });
                        });
                    });
                });
            });
        } catch (error) {
            console.error('Error retrieving vehicle options:', error.response ? error.response.data : error.message);
            showMenu();
        }
    });
}

// Function to view all configurations
async function viewConfigurations() {
    try {
        const response = await axios.get(`${BASE_URL}/configurations`);
        console.log('Configurations:', response.data);
    } catch (error) {
        console.error('Error retrieving configurations:', error.response ? error.response.data : error.message);
    }
    showMenu();
}
async function deleteConfiguration() {
    rl.question('Enter the configuration ID to delete: ', async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/configurations/${id}`);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error deleting configuration:', error.response ? error.response.data : error.message);
        }
        showMenu();
    });
}
// Function to delete a configuration

// Start the CLI
showMenu();
