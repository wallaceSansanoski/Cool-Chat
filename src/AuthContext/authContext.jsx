import { createContext } from "react";
import { useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service/db";

export const authContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [ currentUser, setCurrentUser ] = useState(false)

        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })


    return <authContext.Provider value={currentUser}>{children}</authContext.Provider>
}