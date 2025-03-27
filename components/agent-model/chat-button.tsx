"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { BsChatDots } from "react-icons/bs";

import { ChatDrawer } from "./chat-drawer";

export const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <BsChatDots className="text-xl" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && <ChatDrawer onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
