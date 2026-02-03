const db = require('../db/database');

class Exercise {
  static create(userId, description, duration, date) {
    const stmt = db.prepare(
      'INSERT INTO exercises (user_id, description, duration, date) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(userId, description, duration, date);
    return {
      id: result.lastInsertRowid,
      userId: userId,
      description: description,
      duration: duration,
      date: date
    };
  }

  static findByUserId(userId, options = {}) {
    const { from, to, limit } = options;
    let query = 'SELECT id, description, duration, date FROM exercises WHERE user_id = ?';
    const params = [userId];

    if (from) {
      query += ' AND date >= ?';
      params.push(from);
    }

    if (to) {
      query += ' AND date <= ?';
      params.push(to);
    }

    query += ' ORDER BY date DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(limit);
    }

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static countByUserId(userId, options = {}) {
    const { from, to } = options;
    let query = 'SELECT COUNT(*) as count FROM exercises WHERE user_id = ?';
    const params = [userId];

    if (from) {
      query += ' AND date >= ?';
      params.push(from);
    }

    if (to) {
      query += ' AND date <= ?';
      params.push(to);
    }

    const stmt = db.prepare(query);
    const result = stmt.get(...params);
    return result.count;
  }
}

module.exports = Exercise;
