const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const referralRoutes = require('./routes/referralRoutes');
const listingRoutes = require('./routes/listingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const forumRoutes = require('./routes/forumRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Configure CORS to requests from your frontend (localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',  // requests only from localhost:3000
  methods: ['GET', 'POST'],        // specific methods
  allowedHeaders: ['Content-Type'], // specific headers
  credentials: true,               
};


// Middleware
app.use(express.json());

// CORS middleware with the defined options
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Use Stripe routes
app.use('/api/stripe', stripeRoutes);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/referrals', referralRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Trading Platform API is running');
});

// Define port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
