"use client";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ColorOptionButtonProps {
  color: string;
  onClick: (color: string) => void;
  disabled?: boolean;
  className?: string;
}

const ColorOptionButton = ({
  color,
  onClick,
  disabled,
  className
}: ColorOptionButtonProps) => {
  return (
    <motion.div
      className={cn(`
        w-16 h-16 rounded-full shadow-md flex items-center justify-center relative overflow-hidden ${className}`)}
      whileHover={{ scale: 1.1 }} // Scale effect on hover
      transition={{ duration: 0.3 }}
    >
      <Button
        className="colorOption w-full h-full rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
        onClick={() => onClick(color)}
        disabled={!!disabled}
        data-testid="colorOption"
      >
        <span className="text-white font-bold">Select</span>
      </Button>
    </motion.div>
  );
};

export default ColorOptionButton;
