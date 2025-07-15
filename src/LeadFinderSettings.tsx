import React, { useState } from 'react';
import LeadDiscoveryService from '../api/leadDiscoveryService';

const LeadFinderSettings = () => {
  const [hashtags, setHashtags] = useState(['#roofing', '#roofrepair', '#stormdamage']);
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(50);
  const [autoApprove, setAutoApprove] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const handleTestSearch = async () => {
    try {
      const results = await LeadDiscoveryService.searchByHashtags(hashtags, 5);
      setTestResults(results);
    } catch (error) {
      console.error('Test search failed:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Finder Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hashtags</label>
          <input
            type="text"
            value={hashtags.join(', ')}
            onChange={(e) => setHashtags(e.target.value.split(',').map(tag => tag.trim()))}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Radius (miles)</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={autoApprove}
            onChange={(e) => setAutoApprove(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Auto-approve new leads</span>
        </div>

        <button
          onClick={handleTestSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Test Search
        </button>

        {testResults.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-900 mb-2">Test Results</h4>
            <ul className="space-y-2">
              {testResults.map((user, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <img src={user.profile_pic_url} alt={user.username} className="h-8 w-8 rounded-full" />
                  <span>{user.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadFinderSettings;
