const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Initialize database connection
require('./db/database');

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Error handling middleware (must be last)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
