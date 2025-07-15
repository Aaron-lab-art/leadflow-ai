import React, { useState } from 'react';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    dailyLimit: 50,
    activeHours: { start: '09:00', end: '18:00' },
    notificationEmail: '',
    telegramToken: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      activeHours: { ...prev.activeHours, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add save/update logic here
    console.log('Settings saved:', settings);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Daily DM Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily DM Send Limit
          </label>
          <input
            type="number"
            name="dailyLimit"
            value={settings.dailyLimit}
            onChange={handleChange}
            min="1"
            max="1000"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Active Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Outreach Active Hours
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="time"
                name="start"
                value={settings.activeHours.start}
                onChange={handleTimeChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <input
                type="time"
                name="end"
                value={settings.activeHours.end}
                onChange={handleTimeChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Notification Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notification Email
          </label>
          <input
            type="email"
            name="notificationEmail"
            value={settings.notificationEmail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Enter email for notifications"
          />
        </div>

        {/* Telegram Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telegram Bot Token
          </label>
          <input
            type="text"
            name="telegramToken"
            value={settings.telegramToken}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Enter your Telegram bot token"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
