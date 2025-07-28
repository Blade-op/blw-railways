const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  trainNumber: {
    type: String,
    required: true
  },
  trainName: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  passengerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  seatCount: {
    type: Number,
    required: true,
    min: 1
  },
  travelDate: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'BLW' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);