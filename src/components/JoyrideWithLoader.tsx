"use client";
import React, { useState, useEffect } from "react";
import ReactJoyride from "react-joyride";
import ColorGame from "./ColorGame";

const JoyrideWithLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const steps = [
    {
      target: "[data-testid='colorBox']",
      content: "This is the target color you need to guess!"
    },
    {
      target: "[data-testid='colorOption']",
      content: "Click one of these color options to guess!"
    },
    {
      target: "[data-testid='gameInstructions']",
      content: "Follow the instructions and try to guess the color correctly!"
    },
    {
      target: "[data-testid='gameStatus']",
      content: "This will tell you if your guess was correct or wrong."
    },
    {
      target: "[data-testid='score']",
      content: "Your score will increase with each correct guess!"
    },
    {
      target: "[data-testid='newGameButton']",
      content: "Click here to start a new game after each round."
    }
  ];

  return (
    <>
      {/* Joyride Tour */}
      {!loading && (
        <ReactJoyride
          steps={steps}
          continuous
          showSkipButton
          scrollToFirstStep
          disableScrolling={false}
        />
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <ColorGame />
      )}
    </>
  );
};

export default JoyrideWithLoader;
