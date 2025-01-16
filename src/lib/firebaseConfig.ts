import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDiH_6Iju6fr-QE7cmnsrSq0QFPIRsLQPI",
  authDomain: "ecommmerce-90273.firebaseapp.com",
  projectId: "ecommmerce-90273",
  storageBucket: "ecommmerce-90273.firebasestorage.app",
  messagingSenderId: "952259731226",
  appId: "1:952259731226:web:f04c55749a77f82ccd56a3",
  measurementId: "G-67DPBDYWTJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
