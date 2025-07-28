import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Calendar, CreditCard, Shield } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Train className="h-12 w-12 text-red-600" />,
      title: 'Easy Booking',
      description: 'Book train tickets quickly and securely with our streamlined process'
    },
    {
      icon: <Calendar className="h-12 w-12 text-blue-600" />,
      title: 'Flexible Dates',
      description: 'Search and book tickets for your preferred travel dates'
    },
    {
      icon: <CreditCard className="h-12 w-12 text-green-600" />,
      title: 'Secure Payment',
      description: 'Multiple payment options with bank-level security'
    },
    {
      icon: <Shield className="h-12 w-12 text-purple-600" />,
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmation and e-tickets'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to BLW Railways
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your gateway to convenient and comfortable train travel across India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Your Ticket
              </Link>
              <Link
                to="/cancellation"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                Cancel Booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose BLW Railways?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Train Animation Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Experience the Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join millions of passengers who trust BLW Railways for their travel needs
            </p>
          </div>
          
          {/* Animated Train */}
          <div className="relative h-32 bg-gradient-to-r from-blue-100 to-red-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              <div className="animate-pulse">
                <Train className="h-16 w-16 text-red-600 animate-bounce" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-bold text-gray-700">
                🚂 Your Journey Starts Here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/booking"
              className="bg-red-600 hover:bg-red-700 p-6 rounded-lg transition-colors"
            >
              <Train className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Book Ticket</h3>
              <p className="text-gray-300">Search and book your train tickets</p>
            </Link>
            <Link
              to="/cancellation"
              className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg transition-colors"
            >
              <CreditCard className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cancel Booking</h3>
              <p className="text-gray-300">Cancel your existing bookings</p>
            </Link>
            <Link
              to="/admin"
              className="bg-green-600 hover:bg-green-700 p-6 rounded-lg transition-colors"
            >
              <Shield className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
              <p className="text-gray-300">Manage trains and bookings</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;