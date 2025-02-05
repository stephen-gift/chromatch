"use client";

import { motion } from "framer-motion";
import { Lightbulb, Check, XCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

const instructions = [
  {
    icon: <Lightbulb className="text-yellow-400" />,
    text: "Guess the correct color to win!",
    delay: 0.2
  },
  {
    icon: <Check className="text-green-400" />,
    text: "Select a color from the displayed options to make a guess.",
    delay: 0.4
  },
  {
    icon: <XCircle className="text-red-400" />,
    text: "You have 4 attempts to guess the correct color.",
    delay: 0.6
  },
  {
    icon: <Check className="text-green-400" />,
    text: "If you guess the color correctly, the session ends with a win.",
    delay: 0.8
  },
  {
    icon: <XCircle className="text-red-400" />,
    text: "If you run out of attempts, the session ends with a fail.",
    delay: 1
  },
  {
    icon: <RefreshCcw className="text-blue-400" />,
    text: "After the session ends, a new game starts automatically.",
    delay: 1.2
  }
];

const HowToPlay = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-indigo-500 to-purple-600 text-white">
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How to Play
      </motion.h1>

      {/* Instructions List */}
      <motion.ol
        className="bg-white/20 p-4 rounded-lg shadow-md backdrop-blur-md w-full max-w-lg list-decimal list-inside space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {instructions.map(({ icon, text, delay }, index) => (
          <motion.li
            key={index}
            className="flex items-center space-x-3 text-lg font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
          >
            {icon}
            <span>{text}</span>
          </motion.li>
        ))}
      </motion.ol>

      {/* Back to Game Button */}
      <Link href="/">
        <motion.button
          className="mt-6 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Back to Game
        </motion.button>
      </Link>
    </div>
  );
};

export default HowToPlay;
