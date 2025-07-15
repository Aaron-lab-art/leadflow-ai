import React, { useState } from 'react';
import useAutomation from '../hooks/useAutomation';

export default function LeadDashboard() {
  const { isActive, toggleAutomation } = useAutomation();
  const [isPaused, setIsPaused] = useState(false);

  const handleToggle = () => {
    setIsPaused(!isPaused);
    toggleAutomation();
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className={`p-6 rounded-lg shadow-sm transition-all ${
        isActive ? 'bg-white' : 'bg-gray-50'
      } ${isPaused ? 'opacity-50' : ''}`}>
        <h2 className="text-lg font-semibold mb-2">
          {isActive ? 'Automation' : 'Automation Paused'}
        </h2>
        <div className="flex items-center justify-between">
          <p className={`text-sm ${
            isActive ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {isPaused ? 'Automation Paused' : 'Active: 8:00 AM – 6:00 PM'}
          </p>
          <button
            onClick={handleToggle}
            aria-label={isPaused ? 'Resume automation' : 'Pause automation'}
            className={`px-4 py-2 rounded-md transition-colors ${
              isPaused
                ? 'bg-success text-white hover:bg-success/90'
                : 'bg-error text-white hover:bg-error/90'
            }`}
          >
            {isPaused ? 'Resume Automation' : 'Pause Automation'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Dashboard Overview</h2>
        <div className="text-gray-600">
          <p>Your automation is currently {isPaused ? 'paused' : 'active'}.</p>
          <p className="mt-2">Next steps will be shown here when available.</p>
        </div>
      </div>
    </div>
  );
}
