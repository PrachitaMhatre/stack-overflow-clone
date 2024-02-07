import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPa3alrVjBc0HM0UAQwZkCNZiKooVteKI",
  authDomain: "stackoverflowclone-6c996.firebaseapp.com",
  projectId: "stackoverflowclone-6c996",
  StorageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
