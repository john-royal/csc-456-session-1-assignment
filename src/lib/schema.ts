import { nanoid } from "nanoid";
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
  id: z.string().default(nanoid),
  user: z.object({
    id: z.string(),
    username: z.string(),
    imageUrl: z.string().url().nullable(),
  }),
  imageUrl: z.string().url(),
  createdAt: z.number().default(() => Date.now()),
});
export type Post = z.infer<typeof Post>;

export const UserProfile = z.object({
  username: z.string(),
  email: z.string().email(),
  bio: z.string().optional(),
  profilePicURL: z.string().url().optional(),
});
export type UserProfile = z.infer<typeof UserProfile>;

export const Comment = z.object({
  id: z.string().default(nanoid),
  postId: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    imageUrl: z.string().url().nullable(),
  }),
  content: z.string(),
  createdAt: z.number().default(() => Date.now()),
});
export type Comment = z.infer<typeof Comment>;

export const Like = z.object({
  postId: z.string(),
  userId: z.string(),
});
export type Like = z.infer<typeof Like>;
