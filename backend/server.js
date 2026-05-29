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
  console.log(`Mock Contact Submission: notifying sales@logisti-k.us of message from ${name} (${email})`);
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

// Reviews Database Setup
const fs = require('fs');
const path = require('path');
const REVIEWS_FILE = path.join(__dirname, 'reviews.json');

// Initialize reviews file with some demo approved data if it doesn't exist
if (!fs.existsSync(REVIEWS_FILE)) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify([
    {
      id: "1",
      quote: "LOGISTI-K has completely transformed our supply chain. Their international freight services are reliable.",
      author: "Sarah Jenkins",
      role: "Director of Operations",
      company: "Global Tech Imports",
      rating: 5,
      status: "approved",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      quote: "Working with them for our ocean freight was seamless. Highly recommended for any business.",
      author: "David Chen",
      role: "CEO",
      company: "Chen Manufacturing",
      rating: 5,
      status: "approved",
      createdAt: new Date().toISOString()
    }
  ], null, 2));
}

const getReviews = () => JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
const saveReviews = (reviews) => fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));

// GET /api/reviews (Public - only approved)
app.get('/api/reviews', (req, res) => {
  const reviews = getReviews();
  const approved = reviews.filter(r => r.status === 'approved');
  res.json(approved);
});

// POST /api/reviews (Submit new review - default pending)
app.post('/api/reviews', (req, res) => {
  const { quote, author, role, company, rating } = req.body;
  if (!quote || !author || !rating) {
    return res.status(400).json({ error: 'Quote, author, and rating are required' });
  }
  
  const reviews = getReviews();
  const newReview = {
    id: Date.now().toString(),
    quote,
    author,
    role: role || '',
    company: company || '',
    rating: Number(rating),
    status: 'pending', // Requires admin approval
    createdAt: new Date().toISOString()
  };
  
  reviews.push(newReview);
  saveReviews(reviews);
  
  res.status(201).json({ success: true, message: 'Review submitted for approval', review: newReview });
});

// GET /api/admin/reviews (Admin - all reviews)
app.get('/api/admin/reviews', (req, res) => {
  const reviews = getReviews();
  res.json(reviews);
});

// PUT /api/admin/reviews/:id/status (Admin - approve/reject)
app.put('/api/admin/reviews/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  const reviews = getReviews();
  const reviewIndex = reviews.findIndex(r => r.id === id);
  
  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }
  
  reviews[reviewIndex].status = status;
  saveReviews(reviews);
  
  res.json({ success: true, review: reviews[reviewIndex] });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
