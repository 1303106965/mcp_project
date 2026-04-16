import { Tool } from '../types';
import { searchVector } from '../db/vector';

export const vectorTool: Tool = {
  name: 'vector_search',

  run: async ({ query }) => {
    return await searchVector(query)
  }
};