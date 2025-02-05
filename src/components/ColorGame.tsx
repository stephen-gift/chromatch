"use client";
import React, { useEffect } from "react";
import ColorBox from "./ColorBox";
import { useWindowSize } from "react-use";
import useColorGameStore from "../../store";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";
import { Check, CrossIcon, Lightbulb, RedoDot } from "lucide-react";

const ColorOptionButton = dynamic(() => import("./ColorOptionButton"), {
  ssr: false
});

const ColorGame = () => {
  const {
    colors,
    targetColor,
    gameStatus,
    isRevealed,
    attempts,
    showConfetti,
    setShowConfetti,
    maxAttempts,
    handleGuess
  } = useColorGameStore();

  const { width, height } = useWindowSize();
  const isOutOfAttempts = attempts.length >= maxAttempts;

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    };
  }, [showConfetti, setShowConfetti]);

  return (
    <div className=" relative min-w-full flex flex-col items-center justify-center px-6 text-gray-800 bg-[#f8f8ff] min-h-screen overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="absolute top-0 left-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 shadow-md py-4 rounded-lg">
        <motion.div
          className=" gameInstructions flex items-center justify-start overflow-hidden whitespace-nowrap space-x-8 px-4"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          data-testid="gameInstructions"
        >
          {/* First Text */}
          <div className="flex items-center space-x-2">
            <Lightbulb className="text-yellow-400 text-xl" />
            <motion.p
              className="text-white text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Guess the correct color to win!
            </motion.p>
          </div>
          <span className="text-2xl text-white">•</span>

          {/* Second Text */}
          <div className="flex items-center space-x-2">
            <Check className="text-green-400 text-2xl" />
            <motion.p
              className="text-white text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Select a color from the displayed options to make a guess.
            </motion.p>
          </div>
          <span className="text-2xl text-white">•</span>

          {/* Third Text */}
          <div className="flex items-center space-x-2">
            <CrossIcon className="text-red-400 text-2xl" />
            <motion.p
              className="text-white text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You have 4 attempts to guess the correct color.
            </motion.p>
          </div>
          <span className="text-2xl text-white">•</span>

          {/* Fourth Text */}
          <div className="flex items-center space-x-2">
            <Check className="text-green-400 text-2xl" />
            <motion.p
              className="text-white text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              If you guess the color correctly, the session ends with a win.
            </motion.p>
          </div>
          <span className="text-2xl text-white">•</span>

          {/* Fifth Text */}
          <div className="flex items-center space-x-2">
            <CrossIcon className="text-red-400 text-2xl" />
            <motion.p
              className="text-white text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              If you run out of attempts, the session ends with a fail.
            </motion.p>
          </div>
          <span className="text-2xl text-white">•</span>

          {/* Sixth Text */}
          <div className="flex items-center space-x-2">
            <RedoDot className="text-blue-400 text-2xl" />
            <motion.p
              className="text-white text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              After the session ends, a new game starts automatically.
            </motion.p>
          </div>
        </motion.div>
      </div>
      {/* Game Status */}
      <div
        className=" gameStatus text-center my-4 text-lg font-medium"
        data-testid="gameStatus"
      >
        {gameStatus}
      </div>
      {/* Progress Bar */}
      <Progress
        value={(attempts.length / maxAttempts) * 100}
        max={maxAttempts}
        className="my-5 bg-gray-200"
      />
      <div className="flex flex-col w-full h-full gap-5">
        <ColorBox bgColor={targetColor} isRevealed={isRevealed} />

        <div className="grid grid-cols-3 gap-2 mb-6 justify-center place-items-center">
          {colors.map((color) => (
            <ColorOptionButton
              key={color}
              color={color}
              onClick={() => handleGuess(color)}
              disabled={isOutOfAttempts}
              className="border border-gray-500 hover:border-gray-700 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorGame;
