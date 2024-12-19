import React, { useState } from "react";
import fetchAIResponse from "@/components/ui/chatBox/apiFetch";

const ChatBox = () => {
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState<{ user: string; bot: string }[]>([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const botResponse = await fetchAIResponse(userInput);
    setChatLog([...chatLog, { user: userInput, bot: botResponse }]);
    setUserInput("");
  };

  return (
    <div className="chatbox">
      <div className="chat-log">
        {chatLog.map((entry, idx) => (
          <div key={idx}>
            <p><strong>You:</strong> {entry.user}</p>
            <p><strong>Bot:</strong> {entry.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me anything..."
        className="border p-2"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white p-2">
        Send
      </button>
    </div>
  );
};

export default ChatBox;
