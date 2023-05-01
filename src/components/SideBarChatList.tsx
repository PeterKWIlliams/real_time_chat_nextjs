"use client";
import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface SideBarChatListProps {
  friends: User[];
  sessionId: string;
}

const SideBarChatList: FC<SideBarChatListProps> = ({ sessionId, friends }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="-mx-2 max-h-[25rem] space-y-1 overflow-y-auto">
      {friends.sort().map((friend) => {
        const unseenMessageCount = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="text-gray gap leading group flex items-center gap-x-3 rounded-md text-sm font-semibold hover:bg-gray-50 hover:text-indigo-600 "
            >
              {friend.name}
              {unseenMessageCount > 0 ? (
                <div className=" flex  h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                  {unseenMessageCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SideBarChatList;
