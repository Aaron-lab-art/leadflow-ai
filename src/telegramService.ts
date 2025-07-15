import axios from 'axios';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

class TelegramService {
  static async sendMessage(botToken, chatId, message) {
    try {
      const response = await axios.post(`${TELEGRAM_API_URL}${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
      });
      return response.data;
    } catch (error) {
      console.error('Telegram message failed:', error);
      throw error;
    }
  }

  static async testConnection(botToken, chatId) {
    try {
      await this.sendMessage(botToken, chatId, 'LeadFlow AI: Connection test successful!');
      return true;
    } catch (error) {
      console.error('Telegram connection test failed:', error);
      throw error;
    }
  }

  static async notifyNewReply(botToken, chatId, leadName, message) {
    const text = `New reply from @${leadName}:\n"${message}"`;
    return this.sendMessage(botToken, chatId, text);
  }

  static async notifyNewLead(botToken, chatId, leadName) {
    const text = `New lead added: @${leadName}`;
    return this.sendMessage(botToken, chatId, text);
  }

  static async notifyObjection(botToken, chatId, leadName, objection) {
    const text = `Objection from @${leadName}:\n"${objection}"`;
    return this.sendMessage(botToken, chatId, text);
  }

  static async notifyDealClosed(botToken, chatId, leadName, status) {
    const text = `Deal closed with @${leadName}\nStatus: ${status}`;
    return this.sendMessage(botToken, chatId, text);
  }
}

export default TelegramService;
