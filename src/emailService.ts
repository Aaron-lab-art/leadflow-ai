import axios from 'axios';

const EMAIL_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

class EmailService {
  static async sendEmail(email, subject, body) {
    try {
      const response = await axios.post(EMAIL_API_URL, {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: {
          to_email: email,
          subject,
          body
        }
      });
      return response.data;
    } catch (error) {
      console.error('Email failed:', error);
      throw error;
    }
  }

  static async testConnection(email) {
    try {
      await this.sendEmail(
        email,
        'LeadFlow AI: Connection Test',
        'Your email notifications are working correctly!'
      );
      return true;
    } catch (error) {
      console.error('Email connection test failed:', error);
      throw error;
    }
  }

  static async notifyNewReply(email, leadName, message) {
    const subject = `New DM Reply from @${leadName}`;
    const body = `You received a new message from @${leadName}:\n\n"${message}"`;
    return this.sendEmail(email, subject, body);
  }

  static async notifyDealClosed(email, leadName, status) {
    const subject = `Deal Closed with @${leadName}`;
    const body = `The deal with @${leadName} has been closed.\nStatus: ${status}`;
    return this.sendEmail(email, subject, body);
  }
}

export default EmailService;
