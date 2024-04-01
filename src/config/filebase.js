
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsctOl8MEtVjAKNrU3r_LyKZxj_Daev4w",
  authDomain: "projectmd3-8e9f2.firebaseapp.com",
  projectId: "projectmd3-8e9f2",
  storageBucket: "projectmd3-8e9f2.appspot.com",
  messagingSenderId: "995134538594",
  appId: "1:995134538594:web:173945f8f4bb08acdca23b",
  measurementId: "G-7BB640E1PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const storage = getStorage(app);