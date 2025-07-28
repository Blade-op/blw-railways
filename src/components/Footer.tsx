import React from 'react';
import { Train } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Train className="h-6 w-6 text-red-500" />
            <span className="text-lg font-semibold">BLW Railways</span>
          </div>
          <p className="text-gray-400 text-center">
            Banaras Locomotive Works - Your trusted partner for railway travel
          </p>
          <div className="text-sm text-gray-500">
            © 2025 BLW Railways. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;