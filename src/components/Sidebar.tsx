"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import useColorGameStore, { useSoundStore } from "../../store";
import { Switch } from "../components/ui/switch"; // Import the shadcn Switch
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Menu, X } from "lucide-react";

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
    img: "/icons/help.svg",
    text: "How to Play"
  }
];

const sidebarVariants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const linkVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay: 0.2 }
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { attempts, maxAttempts, score, game, session } = useColorGameStore();
  const { isMusicMuted, isClickMuted, toggleMusicMute, toggleClickMute } =
    useSoundStore();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 z-50 rounded-full p-2 "
        variant="outline"
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>

      <motion.div
        className={cn(
          "sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white lg:px-6 px-2 pb-5 pt-10 transition-all duration-300",
          isCollapsed ? "hidden" : "block"
        )}
        variants={sidebarVariants}
        initial="initial"
        animate="animate"
        transition={sidebarVariants.transition}
      >
        <div>
          {/* Logo Section */}
          <motion.div
            className="flex flex-row items-center gap-2 border-b border-dashed border-blue-900/20 pb-5 max-md:justify-center"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionVariants.transition}
            role="button"
            onClick={() => router.push("/")}
          >
            <Image src={"/icons/logo.svg"} alt="logo" height={37} width={37} />
            <h1 className="text-2xl font-semibold text-blue-900 max-md:hidden">
              ChroMatch
            </h1>
          </motion.div>

          {/* Sidebar Links */}
          <motion.div
            className="flex mt-5 flex-col gap-2"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {adminSideBarLinks.map((link, index) => {
              const isSelected =
                (link.route !== "/" &&
                  pathname.includes(link.route) &&
                  link.route.length > 1) ||
                pathname === link.route;

              return (
                <motion.div
                  variants={linkVariants}
                  key={link.route}
                  initial="initial"
                  animate="animate"
                  transition={{
                    ...linkVariants.transition,
                    delay: index * 0.3
                  }}
                >
                  <Link href={link.route}>
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats Section */}
        {!["/history", "/how-to-play"].includes(pathname) && (
          <motion.div
            className="mt-5 w-full rounded-lg bg-white shadow-md"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="grid grid-cols-2 gap-2 text-center max-md:grid-cols-2 max-sm:grid-cols-1">
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium">Attempts</span>
                <span className="text-lg font-bold">{`${attempts.length} / ${maxAttempts}`}</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-medium">Score</span>
                <span className="score text-lg font-bold" data-testid="score">
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
          </motion.div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-5 w-full">
              Sounds
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Sound Settings</DialogTitle>
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Music</span>
                  <Switch
                    checked={!isMusicMuted}
                    onCheckedChange={toggleMusicMute}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Click Sounds</span>
                  <Switch
                    checked={!isClickMuted}
                    onCheckedChange={toggleClickMute}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Avatar Section */}
        <motion.div
          className="my-3 flex w-full flex-row gap-2 justify-start items-center rounded-full border border-light-400 px-6 py-2 shadow-sm max-md:px-2"
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Avatar>
            <AvatarFallback className="bg-amber-100">G</AvatarFallback>
          </Avatar>

          <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-dark-200">{"Guest"}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
