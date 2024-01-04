import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBufQ9Xi2hMc4bb-yohmRjTRFYvZ-lv62I",
  authDomain: "cool-chat-e2d99.firebaseapp.com",
  projectId: "cool-chat-e2d99",
  storageBucket: "cool-chat-e2d99.appspot.com",
  messagingSenderId: "127302741064",
  appId: "1:127302741064:web:35bd01e04482dc0cef7c7d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, db }