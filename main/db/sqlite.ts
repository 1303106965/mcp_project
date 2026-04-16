import Database from 'better-sqlite3';

export const db = new Database('data.db');

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  age INTEGER
)
`).run();

// 初始化数据
db.prepare(`INSERT INTO users (name, age) VALUES ('张三', 18)`).run();