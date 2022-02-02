import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { createContext, useEffect, useState, useContext, ReactElement } from 'react'
import { auth } from '../Services/Firebase/firebaseConfig'



const userAuthContext = createContext({} as AuthContext);



type Children = {
    children: ReactElement;
}

type AuthContext = {
    isAuthenticated: boolean,
    logOut: any,
    currentUser?:any,
    User?:any,
}



export function UserAuthContextProvider({children}:Children){
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ currentUser, setCurrentUser ] = useState<User>();



    const User = {
        email: currentUser?.email,
        displayName: currentUser?.displayName,
        userId: currentUser?.uid
    }

    //Firebase Methods Go Here

    function logOut(){
        signOut(auth)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser){
                setIsAuthenticated(false)
                setLoading(false)
            } 
            else { 
                setIsAuthenticated(true)
                setCurrentUser(currentUser)
                setLoading(false)
            }
        });
        return () => {
            unsubscribe();
            
        }
    }, [])

    const value = {
        isAuthenticated,
        logOut,
        User
    }

    return (
        <userAuthContext.Provider value={value}>
            {!loading && children}
        </userAuthContext.Provider>
        )
}

export function useUserAuth(){
    return useContext(userAuthContext);
}