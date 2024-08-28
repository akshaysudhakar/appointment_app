const express = require('express');
const cors = require('cors');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup Sequelize
const sequelizeInstance = new sequelize('appointment_app', 'root', 'Akshay@2000', {
    dialect: 'mysql',
    host: 'localhost'
});

const Appointment = sequelizeInstance.define('appointments', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: sequelize.STRING,
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize.STRING,
        allowNull: false
    }
});

// Sync Sequelize models
sequelizeInstance.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Failed to sync database:', err);
});

// Handle form submission
app.post('/book_appointment', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        await Appointment.create({ name, email, phone });
        res.status(200).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).json({ message: 'Failed to book appointment.' });
    }
});

// Fetch all entries
app.get('/entries', async (req, res) => {
    try {
        const entries = await Appointment.findAll();
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ message: 'Failed to fetch entries.' });
    }
});

// Fetch a single entry for editing
app.get('/entry/:id', async (req, res) => {
    try {
        const entry = await Appointment.findByPk(req.params.id);
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ message: 'Entry not found.' });
        }
    } catch (error) {
        console.error('Error fetching entry:', error);
        res.status(500).json({ message: 'Failed to fetch entry.' });
    }
});

// Handle edit entry
app.post('/edit_entry', async (req, res) => {
    try {
        const { id, name, email, phone } = req.body;
        const entry = await Appointment.findByPk(id);
        if (entry) {
            entry.name = name;
            entry.email = email;
            entry.phone = phone;
            await entry.save();
            res.status(200).json({ message: 'Entry updated successfully!' });
        } else {
            res.status(404).json({ message: 'Entry not found.' });
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ message: 'Failed to update entry.' });
    }
});

// Handle delete entry
app.post('/delete_entry', async (req, res) => {
    try {
        const { id } = req.body;
        const entry = await Appointment.findByPk(id);
        if (entry) {
            await entry.destroy();
            res.status(200).json({ message: 'Entry deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Entry not found.' });
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ message: 'Failed to delete entry.' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
