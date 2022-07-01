import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAWZX6aeDTBLdn-abiQRR5bAKloN4XoxUo',
  authDomain: 'gb-react-9f5da.firebaseapp.com',
  projectId: 'gb-react-9f5da',
  storageBucket: 'gb-react-9f5da.appspot.com',
  messagingSenderId: '1041363939259',
  appId: '1:1041363939259:web:b0fba864f5a76d7fecde9e',
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(firebaseAuth, email, password);

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);

const db = getDatabase(app);

export const userRef = ref(db, 'user');
export const messagesRef = ref(db, 'messages');

export const getChatById = (chatId: string) => ref(db, `messages/${chatId}`);

export const getMessageListById = (chatId: string) =>
  ref(db, `messages/${chatId}/messageList/`);
