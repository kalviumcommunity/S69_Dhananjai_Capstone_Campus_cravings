import React, { useState } from "react";

const ChatBox = ({ orderId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
      <h3 className="text-lg font-semibold mb-2">Chat for Order #{orderId}</h3>
      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, index) => (
          <p key={index} className="text-sm">
            <strong>{msg.sender}: </strong>{msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 mt-2 w-full">
        Send
      </button>
    </div>
  );
};

export default ChatBox;