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
    apiKey: "AIzaSyCgyDmvPVEKM9hxFxPXgaXrkbJditcIWFk",
    authDomain: "react-auth-firebase-js-257bf.firebaseapp.com",
    projectId: "react-auth-firebase-js-257bf",
    storageBucket: "react-auth-firebase-js-257bf.appspot.com",
    messagingSenderId: "286328147538",
    appId: "1:286328147538:web:aa8ec91584b53856dc998b",
    measurementId: "G-2TZ9MG36MT"
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