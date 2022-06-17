import { initializeApp } from 'firebase/app';
import {
  getAuth,
  SignInWIthRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const UserDocRef = doc(db, 'users', userAuth.uid);

  console.log(UserDocRef);

  const userSnapshot = await getDoc(UserDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(UserDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return UserDocRef;
};
