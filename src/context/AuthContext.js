import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';


const AuthContext = createContext()

function AuthContextProvider({children}){
    const [user, setUser] = useState({})

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
        });
        return () => {
            unsubscribe()
        }
    })

    return(
        <AuthContext.Provider value={{signUp, login, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}
function UserAuth() {
    return useContext(AuthContext)
}

export {UserAuth, AuthContextProvider}