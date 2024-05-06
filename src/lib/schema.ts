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

export const ContactInput = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10),
});
export type ContactInput = z.infer<typeof ContactInput>;

export const Post = z.object({
  id: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    imageUrl: z.string().url().nullable(),
  }),
  imageUrl: z.string().url(),
});
export type Post = z.infer<typeof Post>;

export const UserProfile = z.object({
  username: z.string(),
  email: z.string().email(),
  bio: z.string().optional(),
  profilePicURL: z.string().url().optional(),
});
export type UserProfile = z.infer<typeof UserProfile>;
