import {initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut }  from 'firebase/auth';
import { getFirestore, collection, setDoc, addDoc } from 'firebase/firestore'
import config from '../../firebase.json'

/**
 * firebase.json 파이어베이스에서 사용되는 내 개인 프로젝트 정보 
 */

const app = initializeApp(config);

const auth = getAuth(app);

export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export const logout = async () => {
  return await signOut(auth);
}


export const signup = async ({ email, password}) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

export const DB = getFirestore(app);

export const createChannel = async ({ title, description }) => {
  const newChannelRef = addDoc(collection(DB, "users"), {
    title,
    description,
    createdAt: Date.now()
  });
  return newChannelRef.id;
}

