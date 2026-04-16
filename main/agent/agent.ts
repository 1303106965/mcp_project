import { client } from '../ai/llm'
import { aiTools } from '../ai/tools'
import { sqliteTool } from '../mcp/sqlite.tool'
import { vectorTool } from '../mcp/vector.tool'

export async function runAgent(input: string) {
  const res = await client.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      {
        role: 'system',
        content: `
你是一个数据助手：
- 查数据库 → 用 sqlite_query
- 查知识 → 用 vector_search
必须优先使用工具
`
      },
      {
        role: 'user',
        content: input
      }
    ],
    tools: aiTools
  })

  const msg = res.choices[0].message

  const call = msg.tool_calls?.[0]

  if (call && call.type === 'function') {
    const fn = call.function
    const args = JSON.parse(fn.arguments)

    if (fn.name === 'sqlite_query') {
      return await sqliteTool.run(args)
    }

    if (fn.name === 'vector_search') {
      return await vectorTool.run(args)
    }
  }

  return msg.content
}