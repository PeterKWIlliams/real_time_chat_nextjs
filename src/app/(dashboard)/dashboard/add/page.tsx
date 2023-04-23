import AddFriendButton from "@/components/ui/AddFriendButton";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="pt-8">
      <h1 className="mb-8 text-5xl font-bold"> add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
