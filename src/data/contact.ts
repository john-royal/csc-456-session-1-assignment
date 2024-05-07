import { z } from "zod";

import { Repository } from "./common/repository";

export const ContactInput = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof ContactInput>;

export const contactRepository = new Repository("contactdata", ContactInput);
