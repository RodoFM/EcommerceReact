import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCdkjG8LLExd9T9eiYj7ppt7652OknNEOo",
  authDomain: "ecommerce-coderfinal.firebaseapp.com",
  projectId: "ecommerce-coderfinal",
  storageBucket: "ecommerce-coderfinal.firebasestorage.app",
  messagingSenderId: "78536411206",
  appId: "1:78536411206:web:16862856a1f05b7b556247",
  measurementId: "G-949KHKVL80"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);