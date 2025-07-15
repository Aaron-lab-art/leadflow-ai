import { useState } from 'react';

interface Conversation {
  username: string;
  messages: string[];
  status: 'new' | 'active';
  lastMessageAt: Date;
}

const useAutomation = () => {
  const [isActive, setIsActive] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [messagesSent, setMessagesSent] = useState(0);
  const [activeConversations, setActiveConversations] = useState<Conversation[]>([]);
  const [closedDeals, setClosedDeals] = useState(0);

  const toggleAutomation = () => {
    setIsActive(prev => !prev);
  };

  const sendMessage = async (username: string, message: string) => {
    if (messagesSent >= dailyLimit || !isActive) return;
    
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300000 + 180000));
    
    setMessagesSent(prev => prev + 1);
    setActiveConversations(prev => [
      ...prev,
      {
        username,
        messages: [message],
        status: 'new',
        lastMessageAt: new Date()
      }
    ]);
  };

  const handleReply = (username: string, message: string) => {
    setActiveConversations(prev => 
      prev.map(conv => 
        conv.username === username
          ? {
              ...conv,
              messages: [...conv.messages, message],
              status: 'active'
            }
          : conv
      )
    );
  };

  const closeDeal = (username: string) => {
    setActiveConversations(prev => prev.filter(conv => conv.username !== username));
    setClosedDeals(prev => prev + 1);
  };

  return {
    isActive,
    toggleAutomation,
    messagesSent,
    activeConversations,
    closedDeals,
    sendMessage,
    handleReply,
    closeDeal
  };
};

export default useAutomation;
