import { useState } from "react";
import {signInWithEmailAndPassword,onAuthStateChanged,signOut,} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";



const LoginPage = (props) => {

    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
  
    const [user, setUser] = useState({});
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  
    
  
    const login = async () => {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        console.log(user);
        alert('Login Succesful')

      } catch (error) {
     console.log(error.message);
     alert('Incorrect Email or Password')


      }
    };
  
    const logout = async () => {
      await signOut(auth);
    };
  
    return (
       
     <div>
  
        <div>
          <h3> Login </h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          
          <button aria-label ='Login' onClick={login}> Login</button>
       
        </div>
  
        <h4> User Logged In: {user?.email}</h4>
        <button aria-label = 'SignOut' onClick={logout}> Sign Out </button>

        <Link to={`/signup`}>
        <h4>Register</h4>
        </Link>
      </div>
   
    );
  }

export default LoginPage