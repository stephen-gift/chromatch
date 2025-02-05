"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import useColorGameStore from "../../store";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const GameHistory = () => {
  const router = useRouter();
  const { history, clearStore } = useColorGameStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div className="w-full border rounded-lg p-4 bg-white shadow-md">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center p-4 w-full">
          <h2 className="text-lg font-semibold sm:text-xl">Game History</h2>
          <Button variant="destructive" onClick={clearStore}>
            Clear
          </Button>
        </div>
      </motion.div>
      {isLoading ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ) : history.length > 0 ? (
        <Accordion type="single" collapsible>
          {history.map((game) => (
            <AccordionItem key={game.game} value={`${game.game}`}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full no-underline">
                  <h3 className="text-md font-medium no-underline">
                    Game {game.game}
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-x-auto mt-4"
                >
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-gray-100 hover:bg-gray-100">
                        <TableHead className="font-semibold text-gray-700 py-3 px-4 border">
                          Session
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-3 px-4 border">
                          Target Color
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-3 px-4 border">
                          Attempts
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-3 px-4 border">
                          Success
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {game.sessions.length > 0
                        ? game.sessions.map((session) => (
                            <motion.tr
                              key={session.session}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <TableCell className="py-3 px-4 border text-gray-700">
                                {session.session}
                              </TableCell>
                              <TableCell className="py-3 px-4 border">
                                <Tooltip.Provider>
                                  <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                      <div
                                        className="w-6 h-6 rounded-full cursor-pointer border-2 border-gray-200"
                                        style={{
                                          backgroundColor: session.targetColor
                                        }}
                                      />
                                    </Tooltip.Trigger>
                                    <Tooltip.Content
                                      side="top"
                                      className="bg-black text-white text-xs px-2 py-1 rounded"
                                    >
                                      {session.targetColor}
                                      <Tooltip.Arrow className="fill-black" />
                                    </Tooltip.Content>
                                  </Tooltip.Root>
                                </Tooltip.Provider>
                              </TableCell>
                              <TableCell className="py-3 px-4 border">
                                <div className="flex flex-row">
                                  {session.attempts.map((attempt, i) => (
                                    <Tooltip.Provider key={i}>
                                      <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                          <div
                                            className="w-6 h-6 rounded-full mr-1 cursor-pointer border-2 border-gray-200"
                                            style={{ backgroundColor: attempt }}
                                          />
                                        </Tooltip.Trigger>
                                        <Tooltip.Content
                                          side="top"
                                          className="bg-black text-white text-xs px-2 py-1 rounded"
                                        >
                                          {attempt}
                                          <Tooltip.Arrow className="fill-black" />
                                        </Tooltip.Content>
                                      </Tooltip.Root>
                                    </Tooltip.Provider>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="py-3 px-4 border">
                                <Tooltip.Provider>
                                  <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                      <span
                                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                                          session.isSuccess
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                      >
                                        {session.isSuccess ? "✔️" : "❌"}
                                      </span>
                                    </Tooltip.Trigger>
                                    <Tooltip.Content
                                      side="top"
                                      className="bg-black text-white text-xs px-2 py-1 rounded"
                                    >
                                      {session.isSuccess ? "Success" : "Failed"}
                                      <Tooltip.Arrow className="fill-black" />
                                    </Tooltip.Content>
                                  </Tooltip.Root>
                                </Tooltip.Provider>
                              </TableCell>
                            </motion.tr>
                          ))
                        : [...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                              <TableCell className="py-3 px-4 border">
                                <Skeleton className="h-4 w-6" />
                              </TableCell>
                              <TableCell className="py-3 px-4 border">
                                <Skeleton className="h-6 w-6 rounded-full" />
                              </TableCell>
                              <TableCell className="py-3 px-4 border">
                                <Skeleton className="h-4 w-32" />
                              </TableCell>
                              <TableCell className="py-3 px-4 border">
                                <Skeleton className="h-4 w-12" />
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-4 text-gray-500"
        >
          <div className="text-xl font-semibold mb-4">
            No game history available.
          </div>
          <div className="mb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button onClick={() => router.push("/")} variant={"secondary"}>
                Play Now to Create Your Game History!
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameHistory;
