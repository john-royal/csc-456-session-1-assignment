import { useState } from "react";

import { Alert } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ContactInput, contactRepository } from "~/data/contact";

function Contact() {
  const form = useForm({
    schema: ContactInput,
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [showToast, setShowToast] = useState(false);
  const handleSubmit = form.handleSubmit(async (data) => {
    await contactRepository.add(data);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 10_000);
  });

  return (
    <div className="contact__wrapper">
      <div className="fixed end-5 top-20 z-50 p-3">
        {showToast && (
          <div className="top- right-0 m-4 rounded-lg border bg-green-500 p-4 font-bold text-white shadow-lg">
            Message Sent!
          </div>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-20 w-full max-w-md space-y-4 rounded bg-white p-5 shadow"
        >
          <div className="mb-4 text-center text-3xl font-bold">Contact Us</div>
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {form.formState.isSubmitting
              ? "Sending Message..."
              : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Contact;
