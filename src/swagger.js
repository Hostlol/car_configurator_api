const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vehicle and Configuration API',
            version: '1.0.0',
            description: 'API documentation for managing vehicles and configurations',
        },
    },
    apis: ['./src/routes/*.js'], // Path to the route files with Swagger comments, adjust as needed
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const swaggerSetup = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
module.exports = swaggerSetup;