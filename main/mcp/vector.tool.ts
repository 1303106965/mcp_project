import { Tool } from '../types';
import { searchVector } from '../db/vector';

export const vectorTool: Tool = {
  name: 'vector_search',

  execute: async ({ query }) => {
    return await searchVector(query);
  }
};