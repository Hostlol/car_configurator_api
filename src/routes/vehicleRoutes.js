const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: car
 *               brand:
 *                 type: string
 *                 example: Honda
 *               model:
 *                 type: string
 *                 example: Civic
 *               motorOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2.0L Turbo", "4.0L BiTurbo"]
 *               rimOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Standard", "Premium"]
 *               colorOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Red", "Blue", "Black"]
 *               productionYear:
 *                 type: integer
 *                 example: 2024
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', vehicleController.createVehicle);

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by vehicle type
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter by model
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., brand, model)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *     responses:
 *       200:
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', vehicleController.getVehicles);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the vehicle to delete
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 */
router.delete('/:id', vehicleController.deleteVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Retrieve a single vehicle by its ID
 *     tags: [Vehicles]
 *     description: Fetch a vehicle from the database based on its unique ID, with details such as type, brand, model, motor options, rim options, color options, and production year.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the vehicle to retrieve
 *     responses:
 *       200:
 *         description: A single vehicle object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The vehicle ID
 *                   example: 10
 *                 type:
 *                   type: string
 *                   description: The type of vehicle
 *                   example: Car
 *                 brand:
 *                   type: string
 *                   description: The vehicle brand
 *                   example: Honda
 *                 model:
 *                   type: string
 *                   description: The model of the vehicle
 *                   example: Civic Type R
 *                 motorOptions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of motor options for the vehicle
 *                   example: ["2.0L Turbo", "4.0L BiTurbo"]
 *                 rimOptions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of rim size options
 *                   example: ["18-inch", "19-inch"]
 *                 colorOptions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of color options
 *                   example: ["Red", "Black", "Blue"]
 *                 productionYear:
 *                   type: integer
 *                   description: The production year of the vehicle
 *                   example: 2024
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Vehicle not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error message
 */
router.get('/:id', vehicleController.getVehicleById);

module.exports = router;