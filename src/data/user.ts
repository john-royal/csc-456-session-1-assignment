import { z } from "zod";

import { Repository } from "./common/repository";

export const UserProfile = z.object({
  username: z.string().min(1).max(15),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
  profilePicURL: z.string().url().optional(),
});

export type UserProfile = z.infer<typeof UserProfile>;

export const usersRepository = new Repository("users", UserProfile);
