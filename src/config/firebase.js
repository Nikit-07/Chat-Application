import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCvEc4UCB39r-E4jkNUI9ZJ_GROCLK35DQ",
  authDomain: "chat-app-2b4f6.firebaseapp.com",
  projectId: "chat-app-2b4f6",
  storageBucket: "chat-app-2b4f6.firebasestorage.app",
  messagingSenderId: "944732081710",
  appId: "1:944732081710:web:2b349d99efcab4894359bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication
const auth = getAuth(app);
const db = getFirestore(app);

// sign up method

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey There I am using Chat App",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

export { signup, login, logout, auth, db };
