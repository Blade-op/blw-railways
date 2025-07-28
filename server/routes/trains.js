const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// Get all trains
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all trains...');
    const trains = await Train.find().sort({ number: 1 });
    console.log(`Found ${trains.length} trains`);
    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ message: 'Error fetching trains', error: error.message });
  }
});

// Get train by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching train with ID: ${req.params.id}`);
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    console.error('Error fetching train:', error);
    res.status(500).json({ message: 'Error fetching train', error: error.message });
  }
});

// Create new train
router.post('/', async (req, res) => {
  try {
    console.log('Creating new train:', req.body);
    const train = new Train(req.body);
    const savedTrain = await train.save();
    console.log('Train created successfully:', savedTrain._id);
    res.status(201).json(savedTrain);
  } catch (error) {
    console.error('Error creating train:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Train number already exists' });
    } else {
      res.status(400).json({ message: 'Error creating train', error: error.message });
    }
  }
});

// Update train
router.put('/:id', async (req, res) => {
  try {
    console.log(`Updating train ${req.params.id}:`, req.body);
    const train = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    console.log('Train updated successfully');
    res.json(train);
  } catch (error) {
    console.error('Error updating train:', error);
    res.status(400).json({ message: 'Error updating train', error: error.message });
  }
});

// Delete train
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting train with ID: ${req.params.id}`);
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    console.log('Train deleted successfully');
    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    console.error('Error deleting train:', error);
    res.status(500).json({ message: 'Error deleting train', error: error.message });
  }
});

module.exports = router;