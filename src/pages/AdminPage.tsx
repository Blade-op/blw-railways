import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Train as TrainIcon } from 'lucide-react';
import { Train } from '../types';
import { api } from '../utils/api';
import TrainForm from '../components/TrainForm';

const AdminPage = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTrain, setEditingTrain] = useState<Train | null>(null);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await api.get('/trains');
      setTrains(response.data);
    } catch (error) {
      console.error('Error fetching trains:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrain = () => {
    setEditingTrain(null);
    setShowForm(true);
  };

  const handleEditTrain = (train: Train) => {
    setEditingTrain(train);
    setShowForm(true);
  };

  const handleDeleteTrain = async (trainId: string) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      try {
        await api.delete(`/trains/${trainId}`);
        fetchTrains();
      } catch (error) {
        console.error('Error deleting train:', error);
        alert('Error deleting train. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (trainData: Omit<Train, '_id'>) => {
    try {
      if (editingTrain) {
        await api.put(`/trains/${editingTrain._id}`, trainData);
      } else {
        await api.post('/trains', trainData);
      }
      setShowForm(false);
      setEditingTrain(null);
      fetchTrains();
    } catch (error) {
      console.error('Error saving train:', error);
      alert('Error saving train. Please try again.');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTrain(null);
  };

  if (showForm) {
    return (
      <TrainForm
        train={editingTrain}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Train Management</h1>
            <p className="text-gray-600">Manage train schedules and information</p>
          </div>
          <button
            onClick={handleAddTrain}
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Train</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trains...</p>
          </div>
        ) : trains.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Train
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trains.map((train) => (
                    <tr key={train._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <TrainIcon className="h-5 w-5 text-red-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {train.number}
                            </div>
                            <div className="text-sm text-gray-500">{train.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {train.source} → {train.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {train.departureTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {train.availableSeats} / {train.totalSeats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{train.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTrain(train)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrain(train._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <TrainIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No trains found. Add your first train to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;