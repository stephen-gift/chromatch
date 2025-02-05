"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import useColorGameStore from "../../store";

const adminSideBarLinks = [
  {
    route: "/",
    img: "/icons/home1.svg",
    text: "Home"
  },
  {
    route: "/history",
    img: "/icons/history.svg",
    text: "History"
  },
  {
    route: "/how-to-play",
    img: "/icons/help.svg", // Add an appropriate icon
    text: "How to Play"
  }
];

const Sidebar = () => {
  const pathname = usePathname();

  const { attempts, maxAttempts, score, game, session } = useColorGameStore();

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white lg:px-6 px-2 pb-5 pt-10">
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-blue-900/20 pb-10 max-md:justify-center">
          <Image src={"/icons/logo.svg"} alt="logo" height={37} width={37} />
          <h1 className="text-2xl font-semibold text-blue-900 max-md:hidden">
            ChroMatch
          </h1>
        </div>
        <div className="flex mt-10 flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center",
                    isSelected && "bg-blue-900 shadow-sm"
                  )}
                >
                  <div className="relative size-4">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={cn("object-contain")}
                    />
                  </div>
                  <p
                    className={cn(
                      "text-base font-medium max-md:hidden",
                      isSelected ? "text-white" : "text-dark-100"
                    )}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {!pathname.includes("/history") && (
        <div className="mt-10 w-full rounded-lg bg-white shadow-md">
          <div className="grid grid-cols-2 gap-2 text-center max-md:grid-cols-2 max-sm:grid-cols-1">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">Attempts</span>
              <span className="text-lg font-bold">{`${attempts.length} / ${maxAttempts}`}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">Score</span>
              <span className="  score text-lg font-bold" data-testid="score">
                {score}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">Game</span>
              <span className="text-lg font-bold">{game}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">Session</span>
              <span className="text-lg font-bold">{session}</span>
            </div>
          </div>
        </div>
      )}

      <div className="my-8 flex w-full flex-row gap-2 justify-start items-center rounded-full border border-light-400 px-6 py-2 shadow-sm max-md:px-2">
        <Avatar>
          <AvatarFallback className="bg-amber-100">G</AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{"Guest"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
