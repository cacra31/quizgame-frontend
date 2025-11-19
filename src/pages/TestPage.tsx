// src/pages/TestPage.tsx
import { useEffect, useState } from "react";
import { useWebSocket } from "@/websocket/useWebSocket";

const TestPage = () => {
  const { connected, send, subscribe } = useWebSocket();
  const [sender, setSender] = useState("sewon");
  const [content, setContent] = useState("");
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogMessages((prev) => [...prev, msg]);
  };

  useEffect(() => {
    if (!connected) return;

    const sub = subscribe("/topic/test", (body:any) => {
      addLog(`📩 받은 메시지: ${body.sender} - ${body.content}`);
    });

    return () => {
      sub?.unsubscribe();
    };
  }, [connected, subscribe]);

  const sendMessage = () => {
    if (!connected) {
      return;
    }

    send("/app/test", { sender, content });
    addLog(`📤 보낸 메시지: ${sender} - ${content}`);
    setContent("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>WebSocket STOMP React Test (Global)</h1>
      <div style={{ marginBottom: 12 }}>
        <p>연결 상태: {connected ? "✅ 연결됨" : "⏳ 연결중..."}</p>
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="sender"
          style={{ marginRight: 8 }}
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="message"
          style={{ marginRight: 8 }}
        />
        <button onClick={sendMessage}>보내기</button>
      </div>

      <div
        style={{
          background: "#f4f4f4",
          padding: 10,
          height: 260,
          overflowY: "auto",
          fontSize: 14,
          whiteSpace: "pre-wrap",
        }}
      >
        {logMessages.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
