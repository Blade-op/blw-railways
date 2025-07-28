const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  departureTime: {
    type: String,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

// Validation to ensure available seats don't exceed total seats
trainSchema.pre('save', function(next) {
  if (this.availableSeats > this.totalSeats) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

module.exports = mongoose.model('Train', trainSchema);