import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8YHZQcx6CyeijDmP31py9kW8gmjytbdk",
  authDomain: "revon-store-9cede.firebaseapp.com",
  projectId: "revon-store-9cede",
  storageBucket: "revon-store-9cede.firebasestorage.app",
  messagingSenderId: "1069457245863",
  appId: "1:1069457245863:web:1c16e0d76adc633ab67d82",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);