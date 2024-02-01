import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    Timestamp,
} from "firebase/firestore";

import { Status, Role } from "./Initvar";
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// const admin_db = admin.firestore();

// --------------------------------    Firebase Config     --------------------------------/
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// --------------------------------    registerWithEmailAndPassword     --------------------------------/
const registerWithEmailAndPassword = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email,
            name,
            created: Timestamp.now(),
            authProvider: "local",
            status: Status[1],
            role: Role[9],
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// --------------------------------    registerWithEmailAndPassword     --------------------------------/
const logInWithEmailAndPassword = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// --------------------------------    registerWithEmailAndPassword     --------------------------------/
const signInWithGoogle = async() => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// --------------------------------    registerWithEmailAndPassword     --------------------------------/
const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// --------------------------------    registerWithEmailAndPassword     --------------------------------/
const logout = () => {
    try {
        signOut(auth);
    } catch (err) {
        console.error(err);
    }
};

// --------------------------------   testButton     --------------------------------/

const testButton = () => {
    try {
        console.log(Status[1]);
        console.log(Role[9]);
    } catch (err) {
        console.error(err);
    }
}

// --------------------------------   Export default app     --------------------------------/
export {
    app,
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,

    testButton
};