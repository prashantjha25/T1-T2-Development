const User = require('../models/User');

const userController = {
  createUser: (req, res, next) => {
    try {
      const { username } = req.body;

      if (!username || username.trim() === '') {
        return res.status(400).json({
          error: 'Username is required and cannot be empty'
        });
      }

      const user = User.create(username.trim());
      res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Username already exists') {
        return res.status(400).json({
          error: 'Username already exists'
        });
      }
      next(error);
    }
  },

  getAllUsers: (req, res, next) => {
    try {
      const users = User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
