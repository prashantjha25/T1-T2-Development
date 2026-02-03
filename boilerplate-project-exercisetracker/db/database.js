const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'exercise-tracker.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE
    )
  `);

  // Exercises table
  db.exec(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create indexes for better query performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_exercises_user_id ON exercises(user_id);
    CREATE INDEX IF NOT EXISTS idx_exercises_date ON exercises(date);
  `);
}

initializeDatabase();

module.exports = db;
