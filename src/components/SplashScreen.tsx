"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/icons/logo.svg";

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${
        visible ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 justify-center items-center z-50`}
    >
      <div className="text-center space-y-4">
        <div className="animate-fadeIn">
          <Image src={logo} alt="Logo" width={150} height={150} />
        </div>
        <div className="text-white text-2xl font-semibold animate-fadeIn">
          Welcome to the Color Game!
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
