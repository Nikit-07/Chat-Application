import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
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

const resetPass = async (email)=>{
  if(!email){
    toast.error("Enter your email");
    return null;
  }

  try {

    const userRef= collection(db, 'users');
    const q = query(userRef, where("email", "==", email));
    const querySnap= await getDocs(q);
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email has been sent");
    }
    else{
      toast.error("Email doesn't exist");
    }
    
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

}

export { signup, login, logout, auth, db, resetPass };
