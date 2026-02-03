const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const exerciseController = require('../controllers/exerciseController');
const bodyParser = require('../middleware/bodyParser');

// Apply body parser middleware for form data
router.use(bodyParser);

// User routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);

// Exercise routes
router.post('/users/:_id/exercises', exerciseController.createExercise);
router.get('/users/:_id/logs', exerciseController.getUserLogs);

module.exports = router;
