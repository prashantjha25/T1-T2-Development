const Exercise = require('../models/Exercise');
const User = require('../models/User');

const exerciseController = {
  createExercise: (req, res, next) => {
    try {
      const userId = parseInt(req.params._id);
      const { description, duration, date } = req.body;

      // Validate user exists
      const user = User.findById(userId);
      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      // Validate required fields
      if (!description || description.trim() === '') {
        return res.status(400).json({
          error: 'Description is required'
        });
      }

      if (duration === undefined || duration === null || duration === '') {
        return res.status(400).json({
          error: 'Duration is required'
        });
      }

      const durationInt = parseInt(duration);
      if (isNaN(durationInt) || durationInt <= 0) {
        return res.status(400).json({
          error: 'Duration must be a positive integer'
        });
      }

      // Handle date - use current date if not provided
      let exerciseDate;
      if (!date || date.trim() === '') {
        exerciseDate = new Date().toISOString().split('T')[0];
      } else {
        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
          return res.status(400).json({
            error: 'Date must be in YYYY-MM-DD format'
          });
        }

        // Validate that it's a valid date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            error: 'Invalid date'
          });
        }

        exerciseDate = date;
      }

      const exercise = Exercise.create(
        userId,
        description.trim(),
        durationInt,
        exerciseDate
      );

      res.status(201).json({
        userId: exercise.userId,
        exerciseId: exercise.id,
        duration: exercise.duration,
        description: exercise.description,
        date: exercise.date
      });
    } catch (error) {
      next(error);
    }
  },

  getUserLogs: (req, res, next) => {
    try {
      const userId = parseInt(req.params._id);
      const { from, to, limit } = req.query;

      // Validate user exists
      const user = User.findById(userId);
      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      // Validate date formats if provided
      if (from) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(from)) {
          return res.status(400).json({
            error: 'from parameter must be in YYYY-MM-DD format'
          });
        }
        const parsedDate = new Date(from);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            error: 'Invalid from date'
          });
        }
      }

      if (to) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(to)) {
          return res.status(400).json({
            error: 'to parameter must be in YYYY-MM-DD format'
          });
        }
        const parsedDate = new Date(to);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            error: 'Invalid to date'
          });
        }
      }

      // Validate limit if provided
      let limitInt = null;
      if (limit !== undefined) {
        limitInt = parseInt(limit);
        if (isNaN(limitInt) || limitInt <= 0) {
          return res.status(400).json({
            error: 'limit must be a positive integer'
          });
        }
      }

      const options = {
        from: from || null,
        to: to || null,
        limit: limitInt
      };

      const logs = Exercise.findByUserId(userId, options);
      const count = Exercise.countByUserId(userId, { from, to });

      res.json({
        id: user.id,
        username: user.username,
        logs: logs,
        count: count
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = exerciseController;
