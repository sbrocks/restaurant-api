const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listing');
const reviewRoutes = require('./routes/review');
const sequelize = require('./config/db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/listings', listingRoutes);
app.use('/reviews', reviewRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
