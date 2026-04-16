import { client } from './main/ai/llm'

async function test() {
  const res = await client.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      { role: 'user', content: '你好' }
    ]
  })

  console.log(res.choices[0].message.content)
}

test()