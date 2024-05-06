import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
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
import { Comment, ContactInput, Like, Post, UserProfile } from "./schema";

export type QueryBuilder = (
  collection: CollectionReference,
  helpers: {
    query: typeof query;
    orderBy: typeof orderBy;
    where: typeof where;
  },
) => Query;

export class Repository<
  TSchema extends z.AnyZodObject,
  TData extends z.infer<TSchema>,
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

  async get(id: string): Promise<TData | null> {
    const doc = await getDoc(this.doc(id));
    const data = doc.data();
    if (data) {
      const result = this.schema.safeParse(data);
      if (result.success) {
        return result.data as TData;
      } else {
        console.warn(
          `The query for "${this.collection.path}/${id}" returned null because the document is invalid:`,
          result.error.flatten(),
        );
      }
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
    let previousData: TData[] | undefined;
    const unsubscribe = onSnapshot(
      withQuery(this.collection, { query, orderBy, where }),
      (querySnapshot) => {
        const newData = this.safeParseSnapshot(querySnapshot);

        // This is a workaround for a Firebase bug that causes the list to
        // fluctuate in length when a new item is added.
        const singleUpdateValue =
          newData.length === 1 ? JSON.stringify(newData[0]) : null;
        if (
          singleUpdateValue &&
          previousData &&
          previousData.some((d) => JSON.stringify(d) === singleUpdateValue)
        ) {
          return;
        }

        previousData = newData;
        callback(newData);
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
      } else {
        console.warn(
          `A query for "${this.collection.path}" returned document "${doc.id}", which is invalid. The document will be omitted from the returned result.`,
          result.error.flatten(),
        );
      }
    });
    return items;
  }
}
export const users = new Repository("users", UserProfile);

export const contactEntries = new Repository("contactdata", ContactInput);

export const posts = new Repository("posts", Post);

export const comments = new Repository("comments", Comment);

export const likes = new Repository("likes", Like);
