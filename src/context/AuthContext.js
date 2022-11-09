import React,{ useContext,useState,useEffect } from "react"
import { createUserWithEmailAndPassword} from "firebase/auth";
 import { auth } from "../firebase";
const AuthContext = React.createContext();

export const useAuth = () =>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState();
    const [loading , setLoading] = useState(true)
    
    

    const value = {
        currentUser,
        signUp
    }

    function signUp(email,password) {
        
        return createUserWithEmailAndPassword(auth,email,password)
        ;
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });

        return unsubscribe
    },[]);

    

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>

  )
}

export default AuthContext
