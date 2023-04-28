"use client";
import { Message } from "@/lib/validations/message";
import { FC, useRef } from "react";

interface MessagesProps {
  initialMessages: Message[];
}

const Messages: FC<MessagesProps> = ({ initialMessages }) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id="messages"
      className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto p-3  "
    >
      {/* <div ref={scrollDownRef}>{messages.map(message)}</div> */}
    </div>
  );
};

export default Messages;
