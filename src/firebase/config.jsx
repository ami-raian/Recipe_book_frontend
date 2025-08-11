import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYyvtnFogaDM3grGMrho--9JQo19j1XUI",
  authDomain: "recipe-book-e8a1d.firebaseapp.com",
  projectId: "recipe-book-e8a1d",
  storageBucket: "recipe-book-e8a1d.firebasestorage.app",
  messagingSenderId: "245741743078",
  appId: "1:245741743078:web:2dbf644f335218e81cc427",
  measurementId: "G-BS5J31WJ5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
