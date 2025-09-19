// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwtPkCum-j9tyAVx5NKKBXQlSMMQwkuJQ",
  authDomain: "heating-app-ca7b3.firebaseapp.com",
  projectId: "heating-app-ca7b3",
  storageBucket: "heating-app-ca7b3.firebasestorage.app",
  messagingSenderId: "264654224009",
  appId: "1:264654224009:web:466c6963a06c134b932458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

//db
export const firestore = getFirestore(app);