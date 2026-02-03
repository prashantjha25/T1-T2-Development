const express = require('express');

// Middleware to parse URL-encoded form data
const bodyParser = express.urlencoded({ extended: true });

module.exports = bodyParser;
