import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, CreditCard } from 'lucide-react';
import TrainCard from '../components/TrainCard';
import BookingForm from '../components/BookingForm';
import { Train } from '../types';
import { api } from '../utils/api';

const BookingPage = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [filteredTrains, setFilteredTrains] = useState<Train[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await api.get('/trains');
      setTrains(response.data);
      setFilteredTrains(response.data);
    } catch (error) {
      console.error('Error fetching trains:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = trains.filter(train => {
      const matchesFrom = !searchParams.from || 
        train.source.toLowerCase().includes(searchParams.from.toLowerCase());
      const matchesTo = !searchParams.to || 
        train.destination.toLowerCase().includes(searchParams.to.toLowerCase());
      
      return matchesFrom && matchesTo;
    });
    setFilteredTrains(filtered);
  };

  const handleBooking = (train: Train) => {
    setSelectedTrain(train);
  };

  if (selectedTrain) {
    return <BookingForm train={selectedTrain} onBack={() => setSelectedTrain(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Train Ticket</h1>
          <p className="text-gray-600">Search and book tickets for your preferred destination</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <input
                type="text"
                placeholder="Source station"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchParams.from}
                onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <input
                type="text"
                placeholder="Destination station"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchParams.to}
                onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchParams.date}
                onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trains List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trains...</p>
          </div>
        ) : filteredTrains.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredTrains.map((train) => (
              <TrainCard
                key={train._id}
                train={train}
                onBook={() => handleBooking(train)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No trains found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;