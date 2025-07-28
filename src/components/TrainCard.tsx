import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { Train } from '../types';

interface TrainCardProps {
  train: Train;
  onBook: () => void;
}

const TrainCard: React.FC<TrainCardProps> = ({ train, onBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <span className="text-red-600 font-bold text-sm">{train.number}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{train.name}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">{train.source}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium">{train.destination}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-medium">{train.departureTime}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Available: {train.availableSeats}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Total: {train.totalSeats}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 lg:mt-0 lg:ml-6">
          <div className="text-right mb-4">
            <p className="text-2xl font-bold text-gray-900">₹{train.price}</p>
            <p className="text-sm text-gray-500">per seat</p>
          </div>
          
          <button
            onClick={onBook}
            disabled={train.availableSeats === 0}
            className={`w-full px-6 py-3 rounded-md font-medium transition-colors ${
              train.availableSeats === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {train.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;