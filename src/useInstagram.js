import { useEffect, useState } from 'react';
import InstagramService from '../api/instagramService';

const useInstagram = () => {
  const [inbox, setInbox] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await InstagramService.getInbox();
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  const sendMessage = async (username, message) => {
    try {
      const response = await InstagramService.sendMessage(username, message);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchInbox = async () => {
    try {
      const inboxData = await InstagramService.getInbox();
      setInbox(inboxData);
    } catch (error) {
      throw error;
    }
  };

  return {
    isConnected,
    inbox,
    sendMessage,
    fetchInbox
  };
};

export default useInstagram;
