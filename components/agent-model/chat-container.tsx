"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { FiSend } from "react-icons/fi";

import { ChatMessage } from "./chat-message";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente virtual da Globoo. Como posso ajudar você hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input, // Changed to match API expectations
        }),
      });

      const data = await response.json();

      // Extract assistant message from the API response
      const assistantContent =
        data.choices && data.choices[0]?.message?.content;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            assistantContent ||
            "Desculpe, não consegui processar sua mensagem corretamente.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[94vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-default-100 px-4 py-2 rounded-xl max-w-[80%]">
              <Spinner size="sm" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-divider">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            fullWidth
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button
            isIconOnly
            color="primary"
            type="submit"
            disabled={!input.trim() || isLoading}
          >
            <FiSend />
          </Button>
        </form>
      </div>
    </div>
  );
};
