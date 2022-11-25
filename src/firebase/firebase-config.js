import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_s1YwiSSvMeZqHkNIFSZLI9xzhXWh_xQ",
  authDomain: "react-blog-1e336.firebaseapp.com",
  projectId: "react-blog-1e336",
  storageBucket: "react-blog-1e336.appspot.com",
  messagingSenderId: "693021608005",
  appId: "1:693021608005:web:60d8c371f47562c49cbb2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);