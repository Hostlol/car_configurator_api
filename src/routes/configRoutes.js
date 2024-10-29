const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

/**
 * @swagger
 * /configurations:
 *   post:
 *     summary: Create a new configuration
 *     tags: [Configurations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleId:
 *                 type: integer
 *                 description: The ID of the vehicle
 *                 example: 10
 *               color:
 *                 type: string
 *                 description: Color of the vehicle
 *                 example: "Red"
 *               rim:
 *                 type: string
 *                 description: Rim option
 *                 example: "Premium"
 *               price:
 *                 type: integer
 *                 description: Total price
 *                 example: 50000
 *               deliveryAddress:
 *                 type: string
 *                 description: Delivery address
 *                 example: "home"
 *               paymentMethod:
 *                 type: string
 *                 description: Payment method
 *                 example: "card"
 *     responses:
 *       201:
 *         description: Configuration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the newly created configuration
 *                   example: 12
 *                 vehicleId:
 *                   type: integer
 *                   example: 10
 *                 color:
 *                   type: string
 *                   example: "Red"
 *                 rim:
 *                   type: string
 *                   example: "Premium"
 *                 price:
 *                   type: integer
 *                   example: 50000
 *                 deliveryAddress:
 *                   type: string
 *                   example: "home"
 *                 paymentMethod:
 *                   type: string
 *                   example: "card"
 *       400:
 *         description: Bad request
 */
router.post('/', configController.createConfig);

/**
 * @swagger
 * /configurations:
 *   get:
 *     summary: Retrieve all configurations
 *     tags: [Configurations]
 *     parameters:
 *       - in: query
 *         name: vehicleId
 *         schema:
 *           type: integer
 *         description: Filter by vehicle ID
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by color
 *       - in: query
 *         name: rim
 *         schema:
 *           type: string
 *         description: Filter by rim
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [color, rim, price]
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Order of sorting
 *     responses:
 *       200:
 *         description: A list of configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   vehicleId:
 *                     type: integer
 *                     example: 10
 *                   color:
 *                     type: string
 *                     example: "black"
 *                   rim:
 *                     type: string
 *                     example: "19 inch"
 *                   price:
 *                     type: integer
 *                     example: 50000
 *                   deliveryAddress:
 *                     type: string
 *                     example: "home"
 *                   paymentMethod:
 *                     type: string
 *                     example: "card"
 *       500:
 *         description: Internal server error
 */
router.get('/', configController.getConfigs);

/**
 * @swagger
 * /configurations/{id}:
 *   delete:
 *     summary: Delete a configuration by ID
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the configuration to delete
 *     responses:
 *       200:
 *         description: Configuration deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Configuration with ID 10 was deleted."
 *       404:
 *         description: Configuration not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', configController.deleteConfig);

module.exports = router;
