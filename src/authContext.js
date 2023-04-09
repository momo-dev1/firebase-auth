import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { auth, db } from "./firebase";


const AuthContext = createContext({
    currentUser: null,
    currentUserUid: null,
    logIn: Promise,
    register: Promise,
    logOut: Promise,
    signInWithGoogle: Promise,
});

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserUid, setCurrentUserUid] = useState(null);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const register = async ({
        username,
        email,
        password,
        birthday,
    }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            updateProfile(auth.currentUser, {
                displayName: username,
            });
            const user = userCredential.user;

            setCurrentUserUid(user.uid)
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
                birthday,
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const logIn = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    const logOut = async () => {
        await signOut(auth);
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.log(err.message);
        }
    }

    const checkUser = async (username, email) => {
        const docRef = doc(db, "users", currentUserUid)
        const users = await getDoc(docRef);
        const isIterateUsername = users.some((user) => user.username === username);
        const isIterateEmail = users.some((user) => user.email === email);

        return [isIterateUsername, isIterateEmail];
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            console.log(err.message);
        }

    };

    const values = {
        logIn,
        register,
        logOut,
        signInWithGoogle,
        currentUser,
        checkUser,
        resetPassword
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}