import { initializeApp } from 'firebase/app';
import {
  getAuth, // creates an Auth instance for us
  GoogleAuthProvider, // creates a goggle authentication instance for us
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  getFirestore, // creates a firestore instance for us
  doc /*used to get document instance */,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqRoPzMrl6Y9NcuzGYaZJ4IPYD3gDPTM8',
  authDomain: 'crwn-clothing-db-25963.firebaseapp.com',
  projectId: 'crwn-clothing-db-25963',
  storageBucket: 'crwn-clothing-db-25963.appspot.com',
  messagingSenderId: '722705021726',
  appId: '1:722705021726:web:b9350518254200a3c9e70f',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      const { user } = await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
