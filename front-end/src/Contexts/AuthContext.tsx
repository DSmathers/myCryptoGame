import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState, useContext, ReactElement } from 'react'
import { auth } from '../Services/Firebase/firebaseConfig'



const userAuthContext = createContext({} as AuthContext);

type Children = {
    children: ReactElement;
}

type AuthContext = {
    isAuthenticated: boolean,
    loading: boolean
}

export function UserAuthContextProvider({children}:Children){
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    //Firebase Methods Go Here

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser){
                setIsAuthenticated(false)
                setLoading(false)
            } 
            else { 
                setIsAuthenticated(true)
                setLoading(false)
            }
        });
        return () => {
            unsubscribe();
            
        }
    }, [])

    const value = {
        isAuthenticated,
        loading
    }

    return <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext);
}