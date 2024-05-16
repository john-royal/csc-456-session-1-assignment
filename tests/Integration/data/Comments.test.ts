import { Comment } from "~/data/comment";
import { describe, it, expect, vi} from 'vitest';
import { Repository } from '~/data/common/repository';


const firebaseFirestoreMock = vi.hoisted(() => { //hoist before the mock so that we can have access to change it later on!!!
  return {
      collection: vi.fn(() => Promise.resolve(true)),
      CollectionReference: vi.fn(() => Promise.resolve(true)),
      deleteDoc: vi.fn(() => Promise.resolve(true)),
      doc: vi.fn(() => Promise.resolve(true)),
      getDoc: vi.fn(() => Promise.resolve(true)),
      getDocs: vi.fn(() => Promise.resolve(true)),
      onSnapshot: vi.fn(() => Promise.resolve(true)),
      orderBy: vi.fn(() => Promise.resolve(true)),
      query: vi.fn(() => Promise.resolve(true)),
      Query: vi.fn(() => Promise.resolve(true)),
      QuerySnapshot: vi.fn(() => Promise.resolve(true)),
      setDoc: vi.fn(() => Promise.resolve(true)),
  };
});

vi.mock('firebase/firestore', async () => {
  const originalModule = await vi.importActual<typeof import('firebase/firestore')>('firebase/firestore');
  return{
      ...originalModule,
      collection: firebaseFirestoreMock.collection,
      CollectionReference: firebaseFirestoreMock.CollectionReference,
      deleteDoc: firebaseFirestoreMock.deleteDoc,
      doc: firebaseFirestoreMock.doc,
      getDoc: firebaseFirestoreMock.getDoc,
      getDocs: firebaseFirestoreMock.getDocs,
      onSnapshot: firebaseFirestoreMock.onSnapshot,
      orderBy: firebaseFirestoreMock.orderBy,
      query: firebaseFirestoreMock.query,
      Query: firebaseFirestoreMock.Query,
      QuerySnapshot: firebaseFirestoreMock.QuerySnapshot,
      setDoc: firebaseFirestoreMock.setDoc
  };
});


vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'unique_id')
}));

vi.mock('~/data/common/repository', () => {
  const actual = vi.importActual('~/data/common/repository');
  return {
    ...actual,
    Repository: vi.fn().mockImplementation(() => ({
      list: vi.fn((data) => data),
      subscribe: vi.fn()
    }))
  };
});

vi.mock('~/data/common/use-subscription', () => ({
  useSubscription: vi.fn()
}));

describe('Comment Schema', () => {
  it('should generate an id and createdAt by default', () => {
    const result = Comment.parse({
      postId: 'post123',
      user: {
        id: 'user123',
        username: 'testuser',
        imageUrl: null,
      },
      content: 'This is a test comment.'
    });

    expect(result.id).toBe('unique_id');
    expect(result.postId).toBe('post123');
  });
});

describe('commentsRepository', () => {
  it('should interact with the Repository for listing comments', async () => {
    const sampleComment = [{
      id: 'comment1',
      postId: 'post123',
      user: {
        id: 'user123',
        username: 'testuser',
        imageUrl: null,
      },
      content: 'This is a test comment.',
      createdAt: Date.now()
    }];
    const newRepoInst = new Repository("comments", sampleComment);

    const data = await newRepoInst.list(sampleComment);
    expect(data).toEqual(sampleComment);
  });
});


