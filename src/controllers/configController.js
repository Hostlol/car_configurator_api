const pool = require('../config/database');

// Create a new configuration
exports.createConfig = async (req, res) => {
    const { vehicleId, color, rim, price, deliveryAddress, paymentMethod } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Configuration (vehicleId, color, rim, price, deliveryAddress, paymentMethod) VALUES (?, ?, ?, ?, ?, ?)',
            [vehicleId, color, rim, price, deliveryAddress, paymentMethod]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all configurations
exports.getConfigs = async (req, res) => {
    try {
        // Extract filter and sort options from query parameters
        const { vehicleId, color, rim, sortBy, order = 'asc' } = req.query;

        // Build SQL query dynamically based on provided filters
        let query = 'SELECT * FROM Configuration WHERE 1=1';
        const params = [];

        if (vehicleId) {
            query += ' AND vehicleId = ?';
            params.push(vehicleId);
        }
        if (color) {
            query += ' AND color = ?';
            params.push(color);
        }
        if (rim) {
            query += ' AND rim = ?';
            params.push(rim);
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

// Delete a configuration by ID
exports.deleteConfig = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Configuration WHERE id = ?', [req.params.id]);
        if (result.affectedRows) {
            res.status(200).json({ message: `Configuration with ID ${req.params.id} was deleted.` });
        } else {
            res.status(404).json({ error: 'Configuration not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
