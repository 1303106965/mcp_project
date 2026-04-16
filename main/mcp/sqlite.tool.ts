import { Tool } from '../types';
import { db } from '../db/sqlite';

export const sqliteTool: Tool = {
  name: 'sqlite_query',

  run: async ({ sql }) => {
    return db.prepare(sql).all()
  }
}