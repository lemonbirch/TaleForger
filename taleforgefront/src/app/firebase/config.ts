import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2nvttZdondpZLVE-6Fl1q2748gQdN3oM",
    authDomain: "taleforge-1531c.firebaseapp.com",
    projectId: "taleforge-1531c",
    storageBucket: "taleforge-1531c.appspot.com",
    messagingSenderId: "204116286304",
    appId: "1:204116286304:web:52f7e00f34ee0152459c05",
    measurementId: "G-3YF2BGEZ23"
  };
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export {app, auth};