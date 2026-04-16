import { useState } from "react";
import styles from "./style.module.scss";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const send = async () => {
    if (!input.trim()) return;
    console.log("发送了:", input);
    const userMsg: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await (window as any).electron.invoke("chat", input);
    console.log("返回了:", res);
    const aiMsg: Message = {
      role: "ai",
      content: JSON.stringify(res, null, 2),
    };

    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>AI SQLite Assistant</div>

      <div className={styles.chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.msg} ${
              m.role === "user" ? styles.user : styles.ai
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入问题..."
        />
        <button onClick={send}>发送</button>
      </div>
    </div>
  );
}
