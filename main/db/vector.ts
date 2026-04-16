import * as lancedb from '@lancedb/lancedb'

let table: any;

export async function initVector() {
  const db = await lancedb.connect('./vector-db');

  table = await db.createTable('docs', [
    {
      id: '1',
      text: '用户权限控制通过角色进行管理',
      vector: Array(384).fill(Math.random())
    }
  ]);

  return table;
}

// 简化 embedding（你后面换千问）
function fakeEmbedding(text: string) {
  return Array(384).fill(0).map(() => Math.random());
}

export async function searchVector(query: string) {
  const vector = fakeEmbedding(query);

  const res = await table.search(vector).limit(3).toArray();
  return res;
}