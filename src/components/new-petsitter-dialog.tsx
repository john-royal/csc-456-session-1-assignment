import { DialogTitle } from "@radix-ui/react-dialog";
import { useUser } from "~/lib/auth";
import { petsitters } from "~/lib/repositories";
import { Petsitter } from "~/lib/schema";
import ImageUploadButton from "./image-upload-button";
import { Alert } from "./ui/alert";
import { LoadingButton } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from "./ui/form";

export default function NewPetsitterDialog(props: { onAdd?: () => void } & React.ComponentProps<typeof Dialog>) {
  const user = useUser();
  const form = useForm({
    schema: Petsitter,
    defaultValues: {
      id: user.uid, // Assuming user ID is used as the petsitter ID
      username: user.username,
      email: user.email,
      name: "",
      location: "",
      hourlyRate: "",
      yearsExperience: "",
      petExperience: "",
      bio: "",
      profilePicURL: user.profilePicURL ?? null,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await petsitters.set(data.id!, data as Petsitter);
    props.onAdd?.(true);
    props.onOpenChange?.(false);
  });

  return (
    <Dialog {...props}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Add Petsitter</DialogTitle>
            </DialogHeader>

            {form.formState.errors.root && (
              <Alert variant="destructive">
                {form.formState.errors.root.message}
              </Alert>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-5">Name</FormLabel>
                  <FormControl>
                    <input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-5">Location</FormLabel>
                  <FormControl>
                    <input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="mr-5">Hourly Rate</FormLabel>
                    <FormControl>
                        <input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="yearExperience"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="mr-5">Years of Experience</FormLabel>
                    <FormControl>
                        <input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="petExperience"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="mr-5">Pet Experience</FormLabel>
                    <FormControl>
                        <input type="text" {...field} />
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
                    <FormLabel className="mr-5">Bio</FormLabel>
                    <FormControl>
                        <textarea {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <DialogFooter>
              <LoadingButton loading={form.formState.isLoading}>
                {form.formState.isLoading ? "Adding..." : "Add"}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
