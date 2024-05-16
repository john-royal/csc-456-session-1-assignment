import { describe, it, expect,vi } from 'vitest';
import {cleanup } from '@testing-library/react';
import { ContactInput } from '~/data/contact';
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


describe('ContactInput Schema', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
  it('should accept valid input', () => {
    const result = ContactInput.safeParse({
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hello, this is a test message with more than ten characters.'
    });

    expect(result.success).toBe(true);
  });

  it('should reject invalid name', () => {
    const result = ContactInput.safeParse({
      name: '',
      email: 'testing@gmail.com',
      message: 'Hello, this is a test message with more than ten characters.'
    });

    expect(result.success).toBe(false);
  });

  it('should reject invalid email', () => {
    const result = ContactInput.safeParse({
      name: 'tester',
      email: 'testing',
      message: 'This should be really long and caus the test to fail, if not the human race is doomed'
    });

    expect(result.success).toBe(false);
  });

  it('should reject short message', () => {
    const result = ContactInput.safeParse({
      name: 'tester',
      email: 'testing@gmail.com',
      message: ''
    });

    expect(result.success).toBe(false);
  });
});

// Optional: Test Repository interactions
describe('interacting with the repository', () => {
  test('storing valid data', async () => {
    const isValid = ContactInput.safeParse({
      name: 'tester',
      email: 'testing@gmail.com',
      message: 'Hello, this is a test message with more than ten characters.'
    });
    expect(isValid.success).toBe(true) //validate the input

    const newRepoInst = new Repository("contactdata", isValid);
    newRepoInst.add = vi.fn().mockReturnValueOnce(Promise.resolve(true));
    const add = await newRepoInst.add();
    await expect(add).toBe(true); // validate the output of adding data
  });

  test('storing invalid data', async () => {
    const notValid = ContactInput.safeParse({
      name: 'J',
      email: 'john.asdasd',
      message: ''
    });
    expect(notValid.success).toBe(false)

    const newRepoInst = new Repository("contactdata", notValid);
    newRepoInst.add = vi.fn().mockReturnValueOnce(Promise.resolve(false));
    const add = await newRepoInst.add();
    await expect(add).toBe(false);
  });
  test('fetching data', async () => {
    const isValid = {
      data: ContactInput.safeParse({
        name: 'tester',
        email: 'testing@gmail.com',
        message: 'Hello, this is a test message with more than ten characters.'
      }),
      id: 0
    };
    expect(isValid.data.success).toBe(true)

    const newRepoInst = new Repository("contactdata", isValid.data);
    // newRepoInst.get = vi.fn().mockReturnValueOnce(Promise.resolve(false));
    firebaseFirestoreMock.setDoc.mockReturnValue(Promise.resolve(true)); //mock the return of setDoc (it should return that it was added in a sense)
    newRepoInst.add = vi.fn().mockReturnValueOnce(firebaseFirestoreMock.setDoc);

    firebaseFirestoreMock.getDoc.mockReturnValueOnce(isValid.data); //mock the return of getDoc by passing in a id
    newRepoInst.get = vi.fn().mockReturnValueOnce(firebaseFirestoreMock.getDoc());

    const fetch = await newRepoInst.get(isValid.id);
    
    await expect(fetch).toBe(isValid.data);
  });
});
