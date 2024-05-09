import { z } from "zod";

export const CreateAccountInput = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
});
export type CreateAccountInput = z.infer<typeof CreateAccountInput>;

export const SignInInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignInInput = z.infer<typeof SignInInput>;
