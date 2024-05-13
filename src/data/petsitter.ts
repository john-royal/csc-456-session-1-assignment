import { z } from "zod";

import { QueryBuilder, Repository } from "./common/repository";
import { useSubscription } from "./common/use-subscription";

export const Petsitter = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string().min(3),
  email: z.string().email(),
  location: z.string(),
  hourlyRate: z.coerce.number(),
  yearExperience: z.coerce.number(),
  petExperience: z.coerce.number(),
  bio: z.string().optional(),
  profilePicURL: z.string().url().nullable().default(null),
});

export type Petsitter = z.infer<typeof Petsitter>;

export const petsittersRepository = new Repository("petsitters", Petsitter);

export const usePetsitters = () => {
  const qb: QueryBuilder = (ref) => ref;

  return useSubscription({
    queryKey: ["petsitters"],
    getInitialData: () => petsittersRepository.list(qb),
    getSubscription: (onValue) => petsittersRepository.subscribe(qb, onValue),
  });
};
