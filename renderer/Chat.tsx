import { useState } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [list, setList] = useState<any[]>([]);

  const send = async () => {
    const res = await (window as any).electron.invoke("chat", msg);

    setList([
      ...list,
      { role: "user", msg },
      { role: "ai", msg: JSON.stringify(res) },
    ]);
    setMsg("");
  };

  return (
    <div style={{ padding: 20 }}>
      {list.map((i, idx) => (
        <div key={idx}>
          <b>{i.role}:</b> {i.msg}
        </div>
      ))}

      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>发送</button>
    </div>
  );
}
