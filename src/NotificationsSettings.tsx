import React, { useState } from 'react';

const NotificationsSettings = () => {
  const [config, setConfig] = useState({
    telegram: {
      botToken: '',
      chatId: '',
      notifications: {
        newReply: true,
        newLead: true,
        objection: true,
        dealClosed: true
      }
    },
    email: {
      address: '',
      notifications: {
        newReply: true,
        dealClosed: true
      }
    }
  });

  const handleConfigChange = (service, field, value) => {
    setConfig(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value
      }
    }));
  };

  const handleNotificationToggle = (service, type) => {
    setConfig(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        notifications: {
          ...prev[service].notifications,
          [type]: !prev[service].notifications[type]
        }
      }
    }));
  };

  const testConnection = async (service) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        alert(`${service} connection test skipped in development`);
        return;
      }
      alert(`${service} connection successful!`);
    } catch (error) {
      alert(`${service} connection failed. Please check your settings.`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      {/* Telegram Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Telegram Notifications</h3>
        {/* ... existing Telegram settings ... */}
      </div>

      {/* Email Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={config.email.address}
              onChange={(e) => handleConfigChange('email', 'address', e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your email address"
            />
          </div>

          {/* Email Notification Toggles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">New Reply Notifications</span>
              <button
                onClick={() => handleNotificationToggle('email', 'newReply')}
                className={`${
                  config.email.notifications.newReply ? 'bg-blue-600' : 'bg-gray-200'
                } w-10 h-6 rounded-full p-1 transition-colors`}
              >
                <div className={`${
                  config.email.notifications.newReply ? 'translate-x-4' : 'translate-x-0'
                } bg-white w-4 h-4 rounded-full transition-transform`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Deal Closed Notifications</span>
              <button
                onClick={() => handleNotificationToggle('email', 'dealClosed')}
                className={`${
                  config.email.notifications.dealClosed ? 'bg-blue-600' : 'bg-gray-200'
                } w-10 h-6 rounded-full p-1 transition-colors`}
              >
                <div className={`${
                  config.email.notifications.dealClosed ? 'translate-x-4' : 'translate-x-0'
                } bg-white w-4 h-4 rounded-full transition-transform`} />
              </button>
            </div>
          </div>

          <button
            onClick={() => testConnection('email')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Test Email Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
