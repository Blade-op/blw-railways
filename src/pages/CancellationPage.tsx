import React, { useState } from 'react';
import { Search, XCircle, RefreshCw } from 'lucide-react';
import { BookingData } from '../types';
import { api } from '../utils/api';

const CancellationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await api.get(`/bookings/search?term=${searchTerm}`);
      setBooking(response.data);
    } catch (error) {
      console.error('Error searching booking:', error);
      alert('Booking not found. Please check your booking ID or email.');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancellation = async () => {
    if (!booking) return;

    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setLoading(true);
      try {
        await api.delete(`/bookings/${booking._id}`);
        setCancelled(true);
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Error cancelling booking. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewSearch = () => {
    setSearchTerm('');
    setBooking(null);
    setCancelled(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cancel Your Booking</h1>
          <p className="text-gray-600">Enter your booking ID or email to find and cancel your reservation</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter booking ID or email address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Booking Details */}
        {booking && !cancelled && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                <p className="font-medium">{booking.bookingId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Train</p>
                <p className="font-medium">{booking.trainNumber} - {booking.trainName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Route</p>
                <p className="font-medium">{booking.source} → {booking.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Passenger</p>
                <p className="font-medium">{booking.passengerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Travel Date</p>
                <p className="font-medium">{booking.travelDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Seats</p>
                <p className="font-medium">{booking.seatCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="font-medium text-green-600">₹{booking.totalAmount}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">Cancellation Policy</h3>
              <p className="text-sm text-yellow-700">
                • Cancellation allowed up to 4 hours before departure
                • Refund amount: 85% of ticket price
                • Processing time: 3-5 business days
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleNewSearch}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Search Another</span>
              </button>
              <button
                onClick={handleCancellation}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5" />
                    <span>Cancel Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Cancellation Confirmation */}
        {cancelled && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Cancelled</h2>
              <p className="text-gray-600 mb-6">
                Your booking has been successfully cancelled. A refund of 85% (₹{Math.round((booking?.totalAmount || 0) * 0.85)}) 
                will be processed to your original payment method within 3-5 business days.
              </p>
              <button
                onClick={handleNewSearch}
                className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
              >
                Cancel Another Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancellationPage;