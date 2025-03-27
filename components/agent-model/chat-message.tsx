"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div
          className={`w-8 h-8 rounded-full relative ${isUser ? "bg-primary" : "bg-default-200"}`}
        >
          <Image
            src={isUser ? "/user-avatar.png" : "/g-globoo.svg"}
            alt={isUser ? "Você" : "Globoo AI"}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div
          className={`px-4 py-2 rounded-xl max-w-[80%] ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-default-100 text-foreground"
          }`}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
};
