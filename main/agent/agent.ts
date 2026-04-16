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

  // 👉 AI选择调用工具
  if (msg.tool_calls) {
    const call = msg.tool_calls[0]

    const args = JSON.parse(call.function.arguments)

    if (call.function.name === 'sqlite_query') {
      return await sqliteTool.run(args)
    }

    if (call.function.name === 'vector_search') {
      return await vectorTool.run(args)
    }
  }

  // 👉 AI直接回答
  return msg.content
}