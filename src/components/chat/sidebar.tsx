import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { useConversations } from "~/data/conversation"; // Adjust the path as necessary

import { cn } from "~/lib/ui";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";

const Sidebar = () => {
  const conversationsQuery = useConversations();
  const currentConversationId = useParams().id;

  return (
    <div className="h-full w-64 overflow-y-scroll border-r">
      <div className="divide-y">
        {conversationsQuery.data?.map((convo) => (
          <Link to={`/messages/${convo.id}`} className="w-full" key={convo.id}>
            <Card
              className={cn(
                "rounded-none border-none shadow-none",
                currentConversationId === convo.id ? "bg-slate-100" : "",
              )}
            >
              <div className="flex flex-row items-center space-x-2 px-4 py-3">
                <Avatar>
                  {convo.participants[0].imageUrl && (
                    <AvatarImage
                      src={convo.participants[0].imageUrl}
                      alt={convo.participants[0].username}
                    />
                  )}
                  <AvatarFallback>
                    {convo.participants[0].username[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1.5">
                  <CardTitle>
                    {convo.participants
                      .map((participant) => participant.username)
                      .join(", ")}
                  </CardTitle>
                  <CardDescription>{convo.lastMessageContent}</CardDescription>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
