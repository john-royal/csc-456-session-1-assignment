import { DialogTitle } from "@radix-ui/react-dialog";

import { useUser } from "~/lib/auth";
import { users } from "~/lib/repositories";
import { UserProfile } from "~/lib/schema";
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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function EditProfileDialog(
  props: React.ComponentProps<typeof Dialog>,
) {
  const user = useUser();
  const form = useForm({
    schema: UserProfile,
    defaultValues: {
      email: user.email,
      username: user.username,
      profilePicURL: user.profilePicURL,
      bio: user.bio,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await users.set(user.email, data);
    props.onOpenChange?.(false); // Close the dialog
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePicURL"
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
                {form.formState.isLoading ? "Saving..." : "Save"}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
