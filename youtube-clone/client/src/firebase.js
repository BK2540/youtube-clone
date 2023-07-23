// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALOcgDKJMEItmVrQVjIZTzhCgpuAP3Mvc",
  authDomain: "video-c1a78.firebaseapp.com",
  projectId: "video-c1a78",
  storageBucket: "video-c1a78.appspot.com",
  messagingSenderId: "38399712170",
  appId: "1:38399712170:web:2c68f67d3de62c7fe929d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;