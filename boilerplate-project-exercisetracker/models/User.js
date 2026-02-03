const db = require('../db/database');

class User {
  static create(username) {
    try {
      const stmt = db.prepare('INSERT INTO users (username) VALUES (?)');
      const result = stmt.run(username);
      return {
        id: result.lastInsertRowid,
        username: username
      };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Username already exists');
      }
      throw error;
    }
  }

  static findAll() {
    const stmt = db.prepare('SELECT id, username FROM users ORDER BY id');
    return stmt.all();
  }

  static findById(id) {
    const stmt = db.prepare('SELECT id, username FROM users WHERE id = ?');
    return stmt.get(id);
  }

  static findByUsername(username) {
    const stmt = db.prepare('SELECT id, username FROM users WHERE username = ?');
    return stmt.get(username);
  }
}

module.exports = User;
