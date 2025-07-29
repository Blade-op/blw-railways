const express = require('express');
const cors = require('cors');
const { mockTrainAPI, mockBookingAPI } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Train routes
app.get('/api/trains', async (req, res) => {
  try {
    const trains = await mockTrainAPI.findAll();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trains', error: error.message });
  }
});

app.get('/api/trains/search', async (req, res) => {
  try {
    const { source, destination } = req.query;
    const trains = await mockTrainAPI.findAll();
    
    let filteredTrains = trains;
    if (source) {
      filteredTrains = filteredTrains.filter(train => 
        train.source.toLowerCase().includes(source.toLowerCase())
      );
    }
    if (destination) {
      filteredTrains = filteredTrains.filter(train => 
        train.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    res.json(filteredTrains);
  } catch (error) {
    res.status(500).json({ message: 'Error searching trains', error: error.message });
  }
});

app.get('/api/trains/:id', async (req, res) => {
  try {
    const train = await mockTrainAPI.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching train', error: error.message });
  }
});

app.post('/api/trains', async (req, res) => {
  try {
    const train = await mockTrainAPI.create(req.body);
    res.status(201).json(train);
  } catch (error) {
    res.status(400).json({ message: 'Error creating train', error: error.message });
  }
});

app.put('/api/trains/:id', async (req, res) => {
  try {
    const train = await mockTrainAPI.updateById(req.params.id, req.body);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    res.status(400).json({ message: 'Error updating train', error: error.message });
  }
});

app.delete('/api/trains/:id', async (req, res) => {
  try {
    const train = await mockTrainAPI.deleteById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting train', error: error.message });
  }
});

// Booking routes
app.get('/api/bookings', async (req, res) => {
  try {
    console.log('Fetching all bookings...');
    const bookings = await mockBookingAPI.findAll();
    console.log(`Found ${bookings.length} bookings`);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

app.get('/api/bookings/search', async (req, res) => {
  try {
    const { term } = req.query;
    console.log(`Searching booking with term: ${term}`);
    
    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const booking = await mockBookingAPI.findOne({
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

app.post('/api/bookings', async (req, res) => {
  try {
    console.log('Creating new booking:', req.body);
    const { trainId, seatCount } = req.body;
    
    // Check if train exists and has enough seats
    const train = await mockTrainAPI.findById(trainId);
    if (!train) {
      console.log('Train not found:', trainId);
      return res.status(404).json({ message: 'Train not found' });
    }
    
    if (train.availableSeats < seatCount) {
      console.log(`Not enough seats. Available: ${train.availableSeats}, Requested: ${seatCount}`);
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    
    // Create booking
    const booking = await mockBookingAPI.create(req.body);
    console.log('Booking created:', booking.bookingId);
    
    // Update train available seats
    train.availableSeats -= seatCount;
    await mockTrainAPI.updateById(trainId, { availableSeats: train.availableSeats });
    console.log(`Updated train seats. New available seats: ${train.availableSeats}`);
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    console.log(`Cancelling booking with ID: ${req.params.id}`);
    const booking = await mockBookingAPI.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }
    
    // Update booking status
    const updatedBooking = await mockBookingAPI.updateById(req.params.id, { status: 'cancelled' });
    console.log('Booking status updated to cancelled');
    
    // Return seats to train
    const train = await mockTrainAPI.findById(booking.trainId);
    if (train) {
      train.availableSeats += booking.seatCount;
      await mockTrainAPI.updateById(booking.trainId, { availableSeats: train.availableSeats });
      console.log(`Returned ${booking.seatCount} seats to train. New available: ${train.availableSeats}`);
    }
    
    res.json({ message: 'Booking cancelled successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
  console.log('Using in-memory data store for demonstration');
});