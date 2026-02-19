// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAf2yO-rHmdvIQ18j98oinjowZzcmDfVw",
    authDomain: "gym-exercises-softuni-jan26.firebaseapp.com",
    projectId: "gym-exercises-softuni-jan26",
    storageBucket: "gym-exercises-softuni-jan26.firebasestorage.app",
    messagingSenderId: "1028678774885",
    appId: "1:1028678774885:web:b21c890101f62ee325168c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);