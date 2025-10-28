import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginecart-bef1b.firebaseapp.com",
  projectId: "loginecart-bef1b",
  storageBucket: "loginecart-bef1b.firebasestorage.app",
  messagingSenderId: "753843449023",
  appId: "1:753843449023:web:47a0dae87bc4dbf562aa0a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
