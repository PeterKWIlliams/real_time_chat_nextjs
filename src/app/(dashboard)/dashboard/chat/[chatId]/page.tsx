import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      "chat:${chatId}:messages",
      0,
      -1
    );
    const dbMessages = result.map((message) => JSON.parse(message) as Message);
    const reversedMessages = dbMessages.reverse();
    const messages = messageArrayValidator.parse(reversedMessages);
    return messages;
  } catch (error) {
    notFound();
  }
}

const page = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  const { chatId } = params;

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (userId1 !== user.id && userId2 !== user.id) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  const intialMessages = await getChatMessages(chatId);
  return <div>{params.chatId}</div>;
};

export default page;
