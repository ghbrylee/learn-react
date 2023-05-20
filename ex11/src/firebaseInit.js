// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1Kl5EnFjsICI4l5E59ggzgk-c-jWwKYA",
  authDomain: "inha-project-fb624.firebaseapp.com",
  projectId: "inha-project-fb624",
  storageBucket: "inha-project-fb624.appspot.com",
  messagingSenderId: "814196328973",
  appId: "1:814196328973:web:fdc698e724456f0c34e344",
  measurementId: "G-X9JPJP9ZPY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);