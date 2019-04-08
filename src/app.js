const path = require('path');
const express = require('express');

const app = express();

/**
 * Middlewares
 */
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use((error, req, res, next) => {
  const { statusCode = 500, message, data } = error;
  console.log('blabla');
  res.status(statusCode).json({ message, data });
});

/**
 * Routes
 */
const formRoutes = require('./routes/formRoutes');

app.use('/forms-data', formRoutes);

const hostname = 'localhost';
const port = 8080;

app.listen(port, hostname);
