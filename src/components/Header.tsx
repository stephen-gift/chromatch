"use client";

import { usePathname, useRouter } from "next/navigation";
import useColorGameStore from "../../store";
import { Button } from "./ui/button";
import { HelpCircle } from "lucide-react";

const Header = () => {
  const { startNewGame } = useColorGameStore();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="flex lg:items-end items-start justify-between  flex-row gap-5 sm:mb-10 mb-5">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">Guest</h2>
      </div>

      {/* New Game Button */}
      <div className="flex justify-center items-center gap-4">
        {!["/history", "/how-to-play"].includes(pathname) && (
          <Button
            onClick={startNewGame}
            className="newGameButton px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            data-testid="newGameButton"
          >
            New Game
          </Button>
        )}
        <Button onClick={() => router.push("/how-to-play")}>
          <HelpCircle />
        </Button>
      </div>
    </header>
  );
};

export default Header;
