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
import { SignInInput } from "~/lib/schema";

export default function SignInPage() {
  const { signIn } = useAuth();

  const form = useForm({
    schema: SignInInput,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="bg-beige-100 flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-8 text-center text-2xl font-bold">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
            {form.formState.errors.root && (
              <Alert variant="destructive">
                {form.formState.errors.root.message}
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" data-testid="email-input" {...field} />
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
                    <Input type="password" data-testid="pwd-input"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
