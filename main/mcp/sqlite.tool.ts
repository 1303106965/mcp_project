import { Tool } from '../types';
import { db } from '../db/sqlite';

export const sqliteTool: Tool = {
  name: 'sqlite_query',

  execute: async ({ sql }) => {
    if (!sql.toLowerCase().startsWith('select')) {
      throw new Error('只允许查询');
    }

    return db.prepare(sql).all();
  }