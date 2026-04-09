import Database from 'better-sqlite3';

export const db = new Database('local.db');

// 初始化
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  )
`).run();