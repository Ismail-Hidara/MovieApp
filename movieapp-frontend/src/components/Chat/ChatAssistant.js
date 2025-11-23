import React, { useState } from "react";
import "./ChatAssistant.css";
import { FaRobot, FaTimes } from "react-icons/fa";
import axios from "axios";

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { type: "user", text: input };
  const updatedMessages = [...messages, userMessage];

  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const response = await axios.post("http://localhost:8080/api/chat/ask", {
      message: input,
      history: updatedMessages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text,
      })),
    });

    const reply = response?.data?.reply || "⚠️ Assistant returned no reply.";
    const botMessage = { type: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    console.error("❌ Error:", err);
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "❌ Sorry! Assistant unavailable." },
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="chat-assistant">
      {!open && (
        <button className="chat-toggle" onClick={toggleChat}>
          <FaRobot />
        </button>
      )}

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <span>🎬 AI Assistant</span>
            <button onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-msg bot">⏳ Thinking...</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me about anime, movies, etc."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
