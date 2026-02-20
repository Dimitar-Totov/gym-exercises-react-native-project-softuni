// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAAf2yO-rHmdvIQ18j98oinjowZzcmDfVw",
    authDomain: "gym-exercises-softuni-jan26.firebaseapp.com",
    projectId: "gym-exercises-softuni-jan26",
    storageBucket: "gym-exercises-softuni-jan26.firebasestorage.app",
    messagingSenderId: "1028678774885",
    appId: "1:1028678774885:web:b21c890101f62ee325168c"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});