import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  profilePic: string;
  location: string;
  followers: number;
}

const mockResults: User[] = [
  {
    id: 1,
    username: 'chicago_roofers',
    profilePic: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    location: 'Chicago, IL',
    followers: 1200
  },
  {
    id: 2,
    username: 'windy_city_roofing',
    profilePic: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    location: 'Chicago, IL',
    followers: 850
  },
  {
    id: 3,
    username: 'premium_roofing_il',
    profilePic: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    location: 'Chicago, IL',
    followers: 2300
  }
];

const LeadDiscoveryPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    setResults(mockResults);
  };

  const handlePreview = (user: User) => {
    navigate('/preview', {
      state: {
        username: user.username,
        profilePic: user.profilePic,
        location: user.location,
        message: `Hi @${user.username}, I came across your profile and wanted to connect about your roofing services.`
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Discovery</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword or location..."
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
        </div>

        {results.length > 0 && (
          <div className="space-y-2">
            {results.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.profilePic}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">@{user.username}</p>
                    <p className="text-sm text-gray-500">{user.location} • {user.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePreview(user)}
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  Preview
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDiscoveryPanel;
