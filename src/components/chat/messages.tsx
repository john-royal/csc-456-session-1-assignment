import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { conversationsRepository } from "~/data/conversation";
import { Message, messagesRepository, useMessages } from "~/data/message";
import { useUser } from "~/lib/auth";
import { cn } from "~/lib/ui";
import { LoadingButton } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "../ui/form";
import { Input } from "../ui/input";

export default function Messages({
  conversationId,
}: {
  conversationId: string;
}) {
  const { data, error, status } = useMessages(conversationId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.scrollIntoView();
    }
  }, [data?.length]);

  if (status === "pending") {
    return <p>Loading...</p>;
  } else if (status === "error") {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="h-[calc(100%-70px)] w-full space-y-4 overflow-y-scroll p-4"
      >
        {data.length === 0 && <p>No messages yet</p>}
        {data.map((message) => (
          <MessageItem message={message} key={message.id} />
        ))}
        <div className="h-px w-full" ref={anchorRef} />
      </div>
      <NewMessageForm conversationId={conversationId} />
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  const user = useUser();
  return (
    <div
      className={cn(
        "flex w-fit flex-col",
        message.user.id === user.uid
          ? "ml-auto items-end"
          : "mr-auto items-start",
      )}
    >
      <h3 className="mb-1 text-xs font-medium text-slate-500">
        {message.user.username}
      </h3>
      <div className="rounded-lg bg-slate-100 p-2">
        <p>{message.content}</p>
      </div>
    </div>
  );
}

function NewMessageForm({ conversationId }: { conversationId: string }) {
  const user = useUser();
  const form = useForm({
    schema: Message,
    defaultValues: {
      conversationId,
      user: {
        id: user.uid,
        username: user.username,
        imageUrl: user.profilePicURL,
      },
      content: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await Promise.allSettled([
        messagesRepository.set(data.id!, {
          ...data,
          createdAt: Date.now(),
        } as Message),
        conversationsRepository.set(conversationId, {
          lastMessageContent: data.content,
          lastMessageTime: Date.now(),
        }),
      ]);
      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "absolute bottom-0 left-0 right-0 flex gap-x-4 border-t bg-white p-4",
          !user && "opacity-50",
        )}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-0">
              <FormLabel className="sr-only">Message</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormControl>
            <LoadingButton type="submit" loading={form.formState.isLoading}>
              Send
            </LoadingButton>
          </FormControl>
        </FormItem>
      </form>
    </Form>
  );
}
