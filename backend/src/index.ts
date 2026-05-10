import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import trackingRoutes from './routes/tracking.routes';
import contactRoutes from './routes/contact.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/tracking', trackingRoutes);
app.use('/api/v1/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`CodingSoft Logistics SaaS Foundation running on port ${PORT}`);
});
