import { tools } from '../mcp';

export async function runAgent(input: string) {

  // 简单路由（后面换 LangGraph）
  if (input.includes('表') || input.includes('users')) {
    return await tools[0].execute({
      sql: 'SELECT * FROM users LIMIT 10'
    });
  }

  // 否则走 RAG
  const docs = await tools[1].execute({ query: input });

  return {
    answer: `根据资料回答：${docs.map(d => d.text).join(',')}`
  };
}