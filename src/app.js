const express = require('express');
const pool = require('./config/database');
const vehicleRoutes = require('./routes/vehicleRoutes');
const configRoutes = require('./routes/configRoutes');
const swaggerSetup = require('./swagger');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
swaggerSetup(app);
app.use('/vehicles', vehicleRoutes);
app.use('/configurations', configRoutes);

// Swagger Documentation


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
