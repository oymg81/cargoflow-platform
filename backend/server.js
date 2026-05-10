require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000']
}));
app.use(express.json()); // Enable JSON parsing

// Basic Endpoints

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running"
  });
});

// Track Endpoint (Mock)
app.post('/api/track', (req, res) => {
  const { trackingNumber } = req.body;
  if (!trackingNumber) {
    return res.status(400).json({ error: 'Tracking number is required' });
  }
  res.status(200).json({
    trackingNumber,
    status: 'In Transit',
    location: 'Distribution Center',
    estimatedDelivery: '3-5 business days'
  });
});

// Contact Endpoint (Mock)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
});

// Quote Endpoint (Mock)
app.post('/api/quote', (req, res) => {
  const { origin, destination, weight } = req.body;
  if (!origin || !destination || !weight) {
    return res.status(400).json({ error: 'Origin, destination, and weight are required' });
  }
  res.status(200).json({
    origin,
    destination,
    weight,
    estimatedCost: '$' + (Math.random() * 500 + 100).toFixed(2),
    currency: 'USD'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
