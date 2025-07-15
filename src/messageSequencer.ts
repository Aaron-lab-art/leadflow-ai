const messageSequencer = () => {
  const openers = [
    "Hey there! Just came across your roofing work — impressive stuff.",
    "Quick question about your lead flow — do you handle that in-house?",
    "Your recent roofing projects look great! How's business been lately?"
  ];

  const followUps = [
    "Curious, what's your current approach to generating leads?",
    "Do you have a system in place for following up with potential clients?",
    "How do you typically handle incoming leads right now?"
  ];

  const valueProps = [
    "We've helped other roofing companies streamline their lead process — might be worth a quick chat?",
    "Our system could help you spend less time chasing leads and more time closing deals.",
    "We specialize in helping roofing businesses like yours scale their lead generation."
  ];

  const closes = [
    "Happy to share some examples if you're open to it.",
    "Would you like me to send over some details about how we could help?",
    "Totally up to you — we can provide a quick breakdown if you're interested."
  ];

  const getNextMessage = (step) => {
    switch(step) {
      case 1:
        return openers[Math.floor(Math.random() * openers.length)];
      case 2:
        return followUps[Math.floor(Math.random() * followUps.length)];
      case 3:
        return valueProps[Math.floor(Math.random() * valueProps.length)];
      case 4:
        return closes[Math.floor(Math.random() * closes.length)];
      default:
        return "Looking forward to hearing your thoughts!";
    }
  };

  return { getNextMessage };
};

export default messageSequencer;
