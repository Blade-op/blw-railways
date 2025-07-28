import React, { useState } from 'react';
import { ArrowLeft, Train as TrainIcon } from 'lucide-react';
import { Train } from '../types';

interface TrainFormProps {
  train?: Train | null;
  onSubmit: (trainData: Omit<Train, '_id'>) => void;
  onCancel: () => void;
}

const TrainForm: React.FC<TrainFormProps> = ({ train, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    number: train?.number || '',
    name: train?.name || '',
    source: train?.source || '',
    destination: train?.destination || '',
    departureTime: train?.departureTime || '',
    totalSeats: train?.totalSeats || 100,
    availableSeats: train?.availableSeats || 100,
    price: train?.price || 500
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['totalSeats', 'availableSeats', 'price'].includes(name) 
        ? parseInt(value) || 0 
        : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={onCancel}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <TrainIcon className="h-8 w-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {train ? 'Edit Train' : 'Add New Train'}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Train Number
                </label>
                <input
                  type="text"
                  name="number"
                  required
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., 12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Train Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., Rajdhani Express"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Station
                </label>
                <input
                  type="text"
                  name="source"
                  required
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., New Delhi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Station
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., Mumbai Central"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time
                </label>
                <input
                  type="time"
                  name="departureTime"
                  required
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Seat (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., 500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Seats
                </label>
                <input
                  type="number"
                  name="totalSeats"
                  required
                  min="1"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Seats
                </label>
                <input
                  type="number"
                  name="availableSeats"
                  required
                  min="0"
                  max={formData.totalSeats}
                  value={formData.availableSeats}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., 85"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
              >
                {train ? 'Update Train' : 'Add Train'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainForm;