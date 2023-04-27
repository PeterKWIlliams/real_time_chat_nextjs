import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface SideBarChatListProps {
  friends: User[];
}

const SideBarChatList: FC<SideBarChatListProps> = ({ friends }) => {
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
        return <div>hello</div>;
      })}
    </ul>
  );
};

export default SideBarChatList;
function userRouter() {
  throw new Error("Function not implemented.");
}
