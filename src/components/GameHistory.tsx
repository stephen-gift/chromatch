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

const GameHistory = () => {
  const { history } = useColorGameStore();
  const [isLoading, setIsLoading] = useState(false); // Simulate loading state

  useEffect(() => {
    setIsLoading(true); // Start loading state
    setTimeout(() => setIsLoading(false), 500); // Simulate loading state for 500ms
  }, []);

  return (
    <div className="w-full border rounded-lg p-2 bg-white shadow-md">
      <h2 className="text-lg font-semibold">Game History</h2>
      {isLoading ? (
        // Skeleton loader for "No game history available"
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
                  {/* <ChevronDown size={20} className="ml-2" /> */}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session</TableHead>
                        <TableHead>Target Color</TableHead>
                        <TableHead>Attempts</TableHead>
                        <TableHead>Success</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {game.sessions.length > 0
                        ? game.sessions.map((session) => (
                            <TableRow key={session.session}>
                              <TableCell>{session.session}</TableCell>
                              <TableCell>
                                <div
                                  className="w-6 h-6 rounded-full"
                                  style={{
                                    backgroundColor: session.targetColor
                                  }}
                                ></div>
                              </TableCell>
                              <TableCell className="flex flex-row ">
                                {session.attempts.map((attempt, i) => (
                                  <div
                                    key={i}
                                    className=" w-6 h-6 rounded-full mr-1"
                                    style={{ backgroundColor: attempt }}
                                  ></div>
                                ))}
                              </TableCell>
                              <TableCell>
                                {session.isSuccess ? "✔️" : "❌"}
                              </TableCell>
                            </TableRow>
                          ))
                        : [...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                              <TableCell>
                                <Skeleton className="h-4 w-6" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-6 rounded-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-32" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-12" />
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-4">No game history available.</div>
      )}
    </div>
  );
};

export default GameHistory;
