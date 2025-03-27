"use client";

import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

import { ChatContainer } from "./chat-container";

interface ChatDrawerProps {
  onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-background border-l border-divider z-50 shadow-xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-divider">
            <h2 className="text-lg font-semibold">Suporte Globoo IA</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-default-100"
            >
              <IoMdClose />
            </button>
          </div>

          <ChatContainer />
        </div>
      </motion.div>
    </>
  );
};
