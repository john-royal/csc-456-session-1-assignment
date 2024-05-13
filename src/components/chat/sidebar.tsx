import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { useConversations } from "~/data/conversation"; // Adjust the path as necessary
import { Button } from "../ui/button";

const Sidebar = () => {
  const conversationsQuery = useConversations();
  const currentConversationId = useParams().id;

  return (
    <div className="h-screen w-64 overflow-y-scroll">
      {conversationsQuery.data?.map((convo) => (
        <Button
          key={convo.id}
          variant={currentConversationId === convo.id ? "secondary" : "default"}
          asChild
        >
          <Link to={`/messages/${convo.id}`}>
            {convo.participants
              .map((participant) => participant.username)
              .join(", ")}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
