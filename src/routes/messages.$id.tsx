import { useParams } from "react-router";

import Messages from "~/components/chat/messages";

export default function MessagesPage() {
  const conversationId = useParams().id!;

  return <Messages conversationId={conversationId} />;
}
