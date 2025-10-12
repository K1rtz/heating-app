import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwtPkCum-j9tyAVx5NKKBXQlSMMQwkuJQ",
  authDomain: "heating-app-ca7b3.firebaseapp.com",
  projectId: "heating-app-ca7b3",
  storageBucket: "heating-app-ca7b3.firebasestorage.app",
  messagingSenderId: "264654224009",
  appId: "1:264654224009:web:466c6963a06c134b932458"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export const firestore = getFirestore(app);