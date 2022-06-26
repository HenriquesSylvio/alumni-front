// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcZz3YUpzbiLxWjlaA_GS4PBJjCy2nkxw",
    authDomain: "alumninws-e9f60.firebaseapp.com",
    projectId: "alumninws-e9f60",
    storageBucket: "alumninws-e9f60.appspot.com",
    messagingSenderId: "718970102262",
    appId: "1:718970102262:web:821cfd02654777f38d67d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);