// Mock data storage for demonstration purposes
let trains = [
  {
    _id: '1',
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
    _id: '2',
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
    _id: '3',
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
    _id: '4',
    number: '12348',
    name: 'Gatimaan Express',
    source: 'Hazrat Nizamuddin',
    destination: 'Agra Cantt',
    departureTime: '08:10',
    totalSeats: 120,
    availableSeats: 80,
    price: 750
  }
];

let bookings = [];
let bookingCounter = 1;

const generateBookingId = () => {
  return 'BLW' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

const mockTrainAPI = {
  findAll: () => Promise.resolve(trains),
  findById: (id) => Promise.resolve(trains.find(t => t._id === id)),
  create: (trainData) => {
    const newTrain = { ...trainData, _id: String(trains.length + 1) };
    trains.push(newTrain);
    return Promise.resolve(newTrain);
  },
  updateById: (id, updateData) => {
    const index = trains.findIndex(t => t._id === id);
    if (index !== -1) {
      trains[index] = { ...trains[index], ...updateData };
      return Promise.resolve(trains[index]);
    }
    return Promise.resolve(null);
  },
  deleteById: (id) => {
    const index = trains.findIndex(t => t._id === id);
    if (index !== -1) {
      const deleted = trains.splice(index, 1)[0];
      return Promise.resolve(deleted);
    }
    return Promise.resolve(null);
  }
};

const mockBookingAPI = {
  findAll: () => Promise.resolve(bookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))),
  findById: (id) => Promise.resolve(bookings.find(b => b._id === id)),
  findOne: (query) => {
    if (query.$or) {
      return Promise.resolve(bookings.find(b => 
        b.bookingId === query.$or[0].bookingId || 
        b.email === query.$or[1].email
      ));
    }
    return Promise.resolve(bookings.find(b => Object.keys(query).every(key => b[key] === query[key])));
  },
  create: (bookingData) => {
    const newBooking = {
      ...bookingData,
      _id: String(bookingCounter++),
      bookingId: generateBookingId(),
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    bookings.push(newBooking);
    return Promise.resolve(newBooking);
  },
  updateById: (id, updateData) => {
    const index = bookings.findIndex(b => b._id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updateData };
      return Promise.resolve(bookings[index]);
    }
    return Promise.resolve(null);
  }
};

module.exports = {
  mockTrainAPI,
  mockBookingAPI,
  trains,
  bookings
};