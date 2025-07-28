const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Train = require('../models/Train');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all bookings...');
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    console.log(`Found ${bookings.length} bookings`);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Search booking by booking ID or email
router.get('/search', async (req, res) => {
  try {
    const { term } = req.query;
    console.log(`Searching booking with term: ${term}`);
    
    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const booking = await Booking.findOne({
      $or: [
        { bookingId: term },
        { email: term.toLowerCase() }
      ]
    });

    if (!booking) {
      console.log('Booking not found');
      return res.status(404).json({ message: 'Booking not found' });
    }

    console.log('Booking found:', booking.bookingId);
    res.json(booking);
  } catch (error) {
    console.error('Error searching booking:', error);
    res.status(500).json({ message: 'Error searching booking', error: error.message });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    console.log('Creating new booking:', req.body);
    const { trainId, seatCount } = req.body;
    
    // Check if train exists and has enough seats
    const train = await Train.findById(trainId);
    if (!train) {
      console.log('Train not found:', trainId);
      return res.status(404).json({ message: 'Train not found' });
    }
    
    if (train.availableSeats < seatCount) {
      console.log(`Not enough seats. Available: ${train.availableSeats}, Requested: ${seatCount}`);
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    
    // Create booking
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    console.log('Booking created:', savedBooking.bookingId);
    
    // Update train available seats
    train.availableSeats -= seatCount;
    await train.save();
    console.log(`Updated train seats. New available seats: ${train.availableSeats}`);
    
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
});

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Cancelling booking with ID: ${req.params.id}`);
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    console.log('Booking status updated to cancelled');
    
    // Return seats to train
    const train = await Train.findById(booking.trainId);
    if (train) {
      train.availableSeats += booking.seatCount;
      await train.save();
      console.log(`Returned ${booking.seatCount} seats to train. New available: ${train.availableSeats}`);
    }
    
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
});

module.exports = router;