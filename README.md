# LeadFlow AI - Instagram Outreach Automation

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- Instagram Business Account
- Telegram Bot Token
- EmailJS Account (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/leadflow-ai.git
   cd leadflow-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`

### Running the App
- Development mode:
  ```bash
  npm run dev
  ```
- Production build:
  ```bash
  npm run build
  npm start
  ```

### Deployment
#### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/your-repo/leadflow-ai)

#### Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Configuration
Edit `.env` file with your credentials:
```env
# Instagram
IG_ACCESS_TOKEN=your_instagram_token
IG_CLIENT_ID=your_client_id
IG_CLIENT_SECRET=your_client_secret

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Email
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id

# App
LEADFLOW_PORT=3000
NODE_ENV=development
```

## 🛠️ Features
- Automated Instagram DM outreach
- Lead discovery engine
- Telegram & Email notifications
- Smart message scheduling
- Lead tracking & analytics

## ⚙️ Scheduled Tasks
The system automatically runs:
- Lead discovery: Daily at 8:00 AM
- Message sending: 8:00 AM - 6:00 PM
- Reply checking: Every 5 minutes
- Notification sending: Real-time

## 📦 Database
Default storage uses SQLite (`leadflow.db`). To switch to MongoDB:
1. Install MongoDB
2. Update `.env`:
   ```env
   DB_TYPE=mongodb
   MONGO_URI=mongodb://localhost:27017/leadflow
   ```

## 🐳 Docker Support
Build and run with Docker:
```bash
docker build -t leadflow .
docker run -p 3000:3000 leadflow
```

## 📄 License
MIT License
