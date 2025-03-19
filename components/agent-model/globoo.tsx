"use client";

import { useState } from "react";
import Image from "next/image";

interface AgentChatProps {
  placeholder?: string;
  buttonText?: string;
  title?: string;
}

const AgentChat: React.FC<AgentChatProps> = ({
  placeholder = "Pergunte a nossa IA.",
  buttonText = "Enviar",
  title = "Resposta:",
}) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();

    if (res.ok) {
      setResponse(data.choices?.[0]?.message?.content || "No response");
    } else {
      setResponse(`Error: ${data.message}`);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 border border-gray-900 max-w-sm rounded-xl justify-self-center mt-4"
      style={{ padding: "20px" }}
    >
      <Image
        alt="Globoo"
        className="mb-4"
        draggable="false"
        height={100}
        src="/g-globoo.svg"
        width={100}
      />
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          placeholder={placeholder}
          style={{ padding: "5px", marginRight: "10px" }}
          className="border border-gray-900 rounded-xl"
        />
        <button
          className="px-4 py-4 bg-white rounded-xl text-black font-bold text-sm cursor-pointer"
          style={{ padding: "5px 10px" }}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
      <p className="text-left max-w-[700px] border-2 border-gray-900 rounded-xl p-4">
        {title} {response}
      </p>
    </div>
  );
};

export default AgentChat;
