import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { useState,useEffect,useContext,createContext } from "react";

//Todo fix with environment varaibles


const firebaseConfig = {
    apiKey: "AIzaSyAd9OP6otVdqYxqtq3_EToQQZCR7AkvQos",
    authDomain: "react-6aceb.firebaseapp.com",
    projectId: "react-6aceb",
    storageBucket: "react-6aceb.appspot.com",
    messagingSenderId: "238610559223",
    appId: "1:238610559223:web:026c5ef309c5f8bd61a3f2",
    measurementId: "G-HHJNRDE8VB"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
export const AuthContext = createContext()
export const AuthContextProvider = props =>{
  const [user,setUser] = useState()
  const[error,setError] = useState()

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(getAuth(),setUser,setError)
    return()=>unsubscribe()
  },[])
return <AuthContext.Provider value={{user,error}}{...props}/>
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return{...auth,isAuthenticated: auth.user != null}
}



