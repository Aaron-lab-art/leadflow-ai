import { useEffect, useRef } from 'react';
import TelegramService from '../api/telegramService';
import EmailService from '../api/emailService';

const useNotifications = (config) => {
  const lastNotification = useRef({});

  const sendNotification = async (type, data) => {
    const now = Date.now();
    const lastSent = lastNotification.current[type] || 0;
    
    // Rate limiting: 1 notification per type per minute
    if (now - lastSent < 60000) return;

    try {
      // Telegram notifications
      if (config.telegram.notifications[type]) {
        await TelegramService[`notify${type}`](
          config.telegram.botToken,
          config.telegram.chatId,
          data.leadName,
          data.message || data.status
        );
      }

      // Email notifications
      if (config.email.notifications[type] && config.email.address) {
        await EmailService[`notify${type}`](
          config.email.address,
          data.leadName,
          data.message || data.status
        );
      }

      lastNotification.current[type] = now;
      logNotification(type, 'Sent', data);
    } catch (error) {
      console.error('Notification failed:', error);
      logNotification(type, 'Failed', data);
    }
  };

  const logNotification = (type, status, data) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      status,
      data
    };
    // Store log entry in local storage or send to backend
    console.log('Notification Log:', logEntry);
  };

  return { sendNotification };
};

export default useNotifications;
