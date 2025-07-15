import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PreviewState {
  username: string;
  profilePic: string;
  location: string;
  message: string;
  timestamp: string;
}

export default function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as PreviewState | undefined;

  if (!state) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Preview Unavailable</h2>
        <p className="text-gray-600 mb-4">No preview data available. Please return to the dashboard.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Preview</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={state.profilePic}
            alt={state.username}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">{state.username}</p>
            <p className="text-sm text-gray-500">{state.location}</p>
          </div>
        </div>
        <p className="text-gray-700">{state.message}</p>
        <p className="text-sm text-gray-500">Preview generated: {state.timestamp}</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Return to Dashboard
        </button>
    </div>
  );
}
