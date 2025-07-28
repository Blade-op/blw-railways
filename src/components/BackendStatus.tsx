import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { testConnection } from '../utils/api';

const BackendStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    const connected = await testConnection();
    setIsConnected(connected);
    setIsChecking(false);
  };

  useEffect(() => {
    checkConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return null; // Don't show anything while initial check is happening
  }

  if (isConnected) {
    return null; // Don't show anything when connected
  }

  return (
    <div className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">Backend Server Offline</h3>
            <p className="text-sm text-red-700 mt-1">
              Please start the backend server to use all features.
            </p>
          </div>
          <button
            onClick={checkConnection}
            disabled={isChecking}
            className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="mt-3 text-xs text-red-600">
          Run: <code className="bg-red-100 px-1 rounded">cd server && npm run dev</code>
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;