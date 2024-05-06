import { DialogTitle } from "@radix-ui/react-dialog";

import { useUser } from "~/lib/auth";
import { posts } from "~/lib/repositories";
import { Post } from "~/lib/schema";
import ImageUploadButton from "./image-upload-button";
import { Alert } from "./ui/alert";
import { LoadingButton } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "./ui/form";

export default function NewPostDialog(
  props: React.ComponentProps<typeof Dialog>,
) {
  const user = useUser();
  const form = useForm({
    schema: Post,
    defaultValues: {
      user: {
        id: user.uid,
        username: user.username,
        imageUrl: user.profilePicURL ?? null,
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await posts.set(data.id!, data as Post);
    props.onOpenChange?.(false);
  });

  return (
    <Dialog {...props}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>New Post</DialogTitle>
            </DialogHeader>

            {form.formState.errors.root && (
              <Alert variant="destructive">
                {form.formState.errors.root.message}
              </Alert>
            )}

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUploadButton onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <LoadingButton loading={form.formState.isLoading}>
                {form.formState.isLoading ? "Creating..." : "Save"}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
