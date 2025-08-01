const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();





app.use(cors({
  origin: 'http://localhost:5173',     // ✅ Exact frontend URL
  credentials: true,                   // ✅ Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/v2/users', require('./routes/userRoutes'));
app.use('/api/v2/auth', require('./routes/authRoutes'));
app.use('/api/v2/match', require('./routes/match'));
app.use('/api/v2/assign', require('./routes/assign'));

app.get('/', (req, res) => {
  res.send('roomate backend is running ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
