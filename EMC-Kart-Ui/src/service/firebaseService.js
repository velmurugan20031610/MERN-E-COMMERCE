import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Prevent re-initialization
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const auth = getAuth(app);

export const firebaseLogin = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const firebaseSignup = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signoutFirebaseUser = () => {
  return signOut(auth);
};

export { auth };

