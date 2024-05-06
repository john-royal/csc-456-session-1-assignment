import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { z } from "zod";

import { db } from "./firebase";
import { ContactInput, Post, UserProfile } from "./schema";

type QueryBuilder = (
  collection: CollectionReference,
  helpers: {
    query: typeof query;
    orderBy: typeof orderBy;
    where: typeof where;
  },
) => Query;

class Repository<
  TSchema extends z.AnyZodObject,
  TData extends z.infer<TSchema> & DocumentData = z.infer<TSchema> &
    DocumentData,
> {
  collection: CollectionReference;

  constructor(
    collectionName: string,
    private readonly schema: TSchema,
  ) {
    this.collection = collection(db, collectionName);
  }

  private doc(id?: string) {
    return doc(this.collection, id);
  }

  async get(id: string) {
    const doc = await getDoc(this.doc(id));
    const data = doc.data();
    if (data) {
      const result = this.schema.safeParse(data);
      return result.success ? result.data : null;
    }
    return null;
  }

  async add(data: TData) {
    await setDoc(doc(this.collection), data);
  }

  async set(id: string, data: Partial<TData>) {
    this.schema.partial().parse(data);
    await setDoc(this.doc(id), data, { merge: true });
  }

  async del(id: string) {
    await deleteDoc(this.doc(id));
  }

  async list(withQuery?: QueryBuilder) {
    const querySnapshot = await getDocs(
      withQuery?.(this.collection, { query, orderBy, where }) ??
        this.collection,
    );
    return this.safeParseSnapshot(querySnapshot);
  }

  subscribe(withQuery: QueryBuilder, callback: (data: TData[]) => void) {
    const unsubscribe = onSnapshot(
      withQuery(this.collection, { query, orderBy, where }),
      (querySnapshot) => {
        const items = this.safeParseSnapshot(querySnapshot);
        callback(items);
      },
    );
    return unsubscribe;
  }

  private safeParseSnapshot(snapshot: QuerySnapshot) {
    const items: TData[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const result = this.schema.safeParse(data);
      if (result.success) {
        items.push(result.data as TData);
      }
    });
    return items;
  }
}
export const users = new Repository("users", UserProfile);

export const contactEntries = new Repository("contactdata", ContactInput);

export const posts = new Repository("posts", Post);
