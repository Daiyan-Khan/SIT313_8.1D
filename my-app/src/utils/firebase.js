// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import bcrypt from "bcryptjs";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUJEW3rjqFI5p5y2lbwThqeNOq3BjM40s",
  authDomain: "deakin-75d56.firebaseapp.com",
  projectId: "deakin-75d56",
  storageBucket: "deakin-75d56.appspot.com",
  messagingSenderId: "357773857162",
  appId: "1:357773857162:web:11c5e8bcb03d225afb7873",
  measurementId: "G-M2HG108VK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

export { db, storage };
// Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

// Function for Google Sign-In Popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Function to sign up with email and password
export const signUpWithEmail = async (name, lastName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name,
            lastName,
            email
        });

        console.log("User signed up and saved to Firestore:", user);
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.error("Email already in use");
            throw new Error("Email address is already in use. Please use a different email address.");
        } else {
            console.error("Error signing up:", error.message);
            throw new Error(error.message);
        }
    }
};
export const checkUserInFirestore = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
                throw new Error('Incorrect password. Please try again.');
            case 'auth/user-not-found':
                throw new Error('No account found with this email.');
            case 'auth/invalid-email':
                throw new Error('Invalid email format.');
            default:
                throw new Error(error.message);
        }
    }
};
