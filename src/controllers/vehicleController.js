const pool = require('../config/database');


exports.createVehicle = async (req, res) => {
    const { type, brand, model, motorOptions, rimOptions, colorOptions, productionYear } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Vehicle (type, brand, model, motorOptions, rimOptions, colorOptions, productionYear) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type, brand, model, JSON.stringify(motorOptions), JSON.stringify(rimOptions), JSON.stringify(colorOptions), productionYear]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getVehicles = async (req, res) => {
    try {
        // Extract filter and sort options from query parameters
        const { type, brand, model, sortBy, order = 'asc' } = req.query;

        // Build SQL query dynamically based on provided filters
        let query = 'SELECT * FROM Vehicle WHERE 1=1';
        const params = [];

        if (type) {
            query += ' AND type = ?';
            params.push(type);
        }
        if (brand) {
            query += ' AND brand = ?';
            params.push(brand);
        }
        if (model) {
            query += ' AND model = ?';
            params.push(model);
        }

        // Apply sorting if specified
        if (sortBy) {
            query += ` ORDER BY ${sortBy} ${order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
        }

        // Execute the query with parameters
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
exports.deleteVehicle = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Vehicle WHERE id = ?', [req.params.id]);
        if (result.affectedRows) {
            res.status(200).json({ message: `Vehicle with ID ${req.params.id} was deleted.` });
        } else {
            res.status(404).json({ error: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Vehicle WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Vehicle not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
