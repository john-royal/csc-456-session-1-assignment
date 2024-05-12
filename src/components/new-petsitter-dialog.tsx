import { toast } from "sonner";

import { Petsitter, petsittersRepository } from "~/data/petsitter";
import { useUser } from "~/lib/auth";
import { Alert } from "./ui/alert";
import { LoadingButton } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
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

export default function NewPetsitterDialog(
  props: React.ComponentProps<typeof Dialog>,
) {
  const user = useUser();
  const form = useForm({
    schema: Petsitter,
    defaultValues: {
      id: user.uid, // Assuming user ID is used as the petsitter ID
      username: user.username,
      email: user.email,
      name: "",
      location: "",
      hourlyRate: 0,
      yearExperience: 0,
      petExperience: 0,
      bio: "",
      profilePicURL: user.profilePicURL,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await petsittersRepository.set(data.id ?? user.uid, data as Petsitter);
    props.onOpenChange?.(false);
    form.reset();
    toast.success("You have been added as a petsitter.");
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
                    <Input type="text" {...field} />
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
                    <Input type="text" {...field} />
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
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
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
                    <Textarea {...field} />
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
