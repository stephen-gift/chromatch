"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useColorGameStore from "../../store";

interface ColorBoxProps {
  bgColor: string | null;
  isRevealed: boolean;
}

const ColorBox = ({ bgColor, isRevealed }: ColorBoxProps) => {
  const { gameStatus } = useColorGameStore();
  return (
    <motion.div
      data-testid="colorBox"
      className="colorBox w-full h-[300px] border-2 border-gray-400 rounded-lg flex items-center justify-center overflow-hidden relative"
      layout
      initial={{ rotateY: 0, scale: 0.8, opacity: 0.5 }}
      animate={{
        rotateY: isRevealed ? 180 : 0,
        scale: isRevealed ? 1 : 0.9,
        opacity: 1
      }}
      transition={{
        rotateY: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.6, ease: "easeOut" },
        opacity: { duration: 0.6 }
      }}
      style={{
        backgroundImage: 'url("/icons/logo.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-lg"></div>

      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            key="guidance"
            className="flex flex-col justify-center items-center text-center font-bold text-3xl text-gray-600 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-center font-bold text-xl text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
            >
              Guess the right color to reveal the color
            </motion.p>
            <motion.img
              src="/icons/logo.svg"
              alt="Moving Icon"
              className="mt-4 w-[50px] h-[50px] mx-auto"
              animate={{
                y: ["0px", "-10px", "0px", "5px", "0px"],
                rotate: [0, 180, 360, 180, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.5
              }}
            />
            <motion.p
              className="text-center font-bold text-xl text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
              data-testid="gameStatus"
            >
              {gameStatus}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="color"
            className="w-full h-full relative z-10"
            style={{ backgroundColor: bgColor ?? "transparent" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ColorBox;
