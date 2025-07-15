import cron from 'node-cron';
import LeadFinder from './leadFinder';
import MessageSender from './messageSender';
import ReplyChecker from './replyChecker';

class Scheduler {
  constructor() {
    this.leadFinder = new LeadFinder();
    this.messageSender = new MessageSender();
    this.replyChecker = new ReplyChecker();
  }

  start() {
    // Lead discovery - daily at 8:00 AM
    cron.schedule('0 8 * * *', () => {
      this.leadFinder.discoverNewLeads();
    });

    // Message sending - 8:00 AM to 6:00 PM, every 30 minutes
    cron.schedule('*/30 8-18 * * *', () => {
      this.messageSender.sendScheduledMessages();
    });

    // Reply checking - every 5 minutes
    cron.schedule('*/5 * * * *', () => {
      this.replyChecker.checkForReplies();
    });
  }
}

export default new Scheduler();
