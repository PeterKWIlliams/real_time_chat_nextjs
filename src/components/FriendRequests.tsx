"use client";
import { Check, UserPlus } from "lucide-react";
import { FC, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequests[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<
    IncomingFriendRequests[]
  >(incomingFriendRequests);
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">nothing to see here</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex items-center gap-4">
            <UserPlus className="text-black" />
            <p className="text-lg font-medium">{request.senderEmail}</p>
            <button
              aria-label="accept friend"
              className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 transition hover:bg-indigo-700 hover:shadow-md "
            >
              <Check className="h-3/4 w-3/4 font-semibold text-white" />
            </button>
            <button></button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
