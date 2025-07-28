import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar, CreditCard } from 'lucide-react';
import { Train, BookingData } from '../types';
import { api } from '../utils/api';

interface BookingFormProps {
  train: Train;
  onBack: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ train, onBack }) => {
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male',
    seatCount: 1,
    travelDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        trainId: train._id,
        trainNumber: train.number,
        trainName: train.name,
        source: train.source,
        destination: train.destination,
        departureTime: train.departureTime,
        ...formData,
        totalAmount: train.price * formData.seatCount,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };

      const response = await api.post('/bookings', bookingData);
      setBooking(response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'seatCount' || name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  if (booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">Your ticket has been booked successfully</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">{booking.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Train:</span>
                  <span className="font-medium">{booking.trainNumber} - {booking.trainName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{booking.source} → {booking.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passenger:</span>
                  <span className="font-medium">{booking.passengerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travel Date:</span>
                  <span className="font-medium">{booking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats:</span>
                  <span className="font-medium">{booking.seatCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium text-green-600">₹{booking.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors"
              >
                Book Another Ticket
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
              >
                Print Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
          </div>

          {/* Train Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Train Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Train</p>
                <p className="font-medium">{train.number} - {train.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-medium">{train.source} → {train.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Departure</p>
                <p className="font-medium">{train.departureTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price per seat</p>
                <p className="font-medium">₹{train.price}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Passenger Name
                </label>
                <input
                  type="text"
                  name="passengerName"
                  required
                  value={formData.passengerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Travel Date
                </label>
                <input
                  type="date"
                  name="travelDate"
                  required
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats</label>
                <select
                  name="seatCount"
                  value={formData.seatCount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{train.price * formData.seatCount}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>Confirm Booking</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;