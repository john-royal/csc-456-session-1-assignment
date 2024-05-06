import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Query,
  setDoc,
  where,
} from "firebase/firestore";

import type { ContactInput, Post, UserProfile } from "./schema";
import { db } from "./firebase";

type QueryBuilder = (
  collection: CollectionReference,
  helpers: {
    query: typeof query;
    where: typeof where;
  },
) => Query;

class Repository<T extends DocumentData> {
  collection: CollectionReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  private doc(id?: string) {
    return doc(this.collection, id);
  }

  async get(id: string) {
    const doc = await getDoc(this.doc(id));
    return doc.data() as T | undefined;
  }

  async add(data: T) {
    await setDoc(doc(this.collection), data);
  }

  async set(id: string, data: Partial<T>) {
    await setDoc(this.doc(id), data, { merge: true });
  }

  async del(id: string) {
    await deleteDoc(this.doc(id));
  }

  async list(withQuery?: QueryBuilder) {
    const querySnapshot = await getDocs(
      withQuery?.(this.collection, { query, where }) ?? this.collection,
    );
    return querySnapshot.docs.map((doc) => doc.data() as T);
  }

  subscribe(withQuery: QueryBuilder, callback: (data: T[]) => void) {
    const unsubscribe = onSnapshot(
      withQuery(this.collection, { query, where }),
      (snapshot) => {
        callback(snapshot.docs.map((doc) => doc.data() as T));
      },
    );
    return unsubscribe;
  }
}
export const users = new Repository<UserProfile>("users");

export const contactEntries = new Repository<ContactInput>("contactdata");

export const posts = new Repository<Post>("posts");
