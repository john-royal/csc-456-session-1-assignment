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
import { useAuth } from "~/lib/auth";
import { CreateAccountInput } from "~/lib/schema";

export default function CreateAccountPage() {
  const { createAccount } = useAuth();

  const form = useForm({
    schema: CreateAccountInput,
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  return (
    <div className="bg-beige-100 flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center text-2xl font-bold">Sign Up Here</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createAccount)}
            className="space-y-4"
          >
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
                    <Input data-testid="username-input" {...field} />
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
                    <Input data-testid="email-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input data-testid="pwd-input" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" data-testid="create-accnt" className="w-full">
              {form.formState.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
