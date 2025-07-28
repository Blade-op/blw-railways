const mongoose = require('mongoose');
const Train = require('./models/Train');
require('dotenv').config();

const sampleTrains = [
  {
    number: '12345',
    name: 'Rajdhani Express',
    source: 'New Delhi',
    destination: 'Mumbai Central',
    departureTime: '16:00',
    totalSeats: 200,
    availableSeats: 150,
    price: 1500
  },
  {
    number: '12346',
    name: 'Shatabdi Express',
    source: 'New Delhi',
    destination: 'Chandigarh',
    departureTime: '07:20',
    totalSeats: 150,
    availableSeats: 120,
    price: 800
  },
  {
    number: '12347',
    name: 'Duronto Express',
    source: 'Mumbai Central',
    destination: 'Howrah',
    departureTime: '22:00',
    totalSeats: 180,
    availableSeats: 95,
    price: 1200
  },
  {
    number: '12348',
    name: 'Gatimaan Express',
    source: 'Hazrat Nizamuddin',
    destination: 'Agra Cantt',
    departureTime: '08:10',
    totalSeats: 120,
    availableSeats: 80,
    price: 750
  },
  {
    number: '12349',
    name: 'Vande Bharat Express',
    source: 'New Delhi',
    destination: 'Varanasi',
    departureTime: '06:00',
    totalSeats: 160,
    availableSeats: 140,
    price: 1800
  },
  {
    number: '12350',
    name: 'Karnataka Express',
    source: 'New Delhi',
    destination: 'Bangalore City',
    departureTime: '12:15',
    totalSeats: 220,
    availableSeats: 180,
    price: 1400
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blw-railways', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Train.deleteMany({});
    console.log('Cleared existing trains');
    
    // Insert sample data
    await Train.insertMany(sampleTrains);
    console.log('Sample trains inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();