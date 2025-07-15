import express from 'express';
import path from 'path';
import Scheduler from './utils/scheduler';
import { PORT } from './config';

const app = express();

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../dist')));

// API routes
app.use('/api', require('./routes'));

// Start scheduler
Scheduler.start();

// Start server
app.listen(PORT, () => {
  console.log(`LeadFlow AI running on port ${PORT}`);
});
