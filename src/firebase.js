// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gZJ63TOzOuGGF3akY5mR5GconQNXtXU",
  authDomain: "chat-app-23ffe.firebaseapp.com",
  projectId: "chat-app-23ffe",
  storageBucket: "chat-app-23ffe.appspot.com",
  messagingSenderId: "10360964206",
  appId: "1:10360964206:web:37c1a4f01de9744cf8d27f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };