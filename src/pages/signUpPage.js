import { useState } from "react";
import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase-config";


const SignUpPage = (props) => {
  

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("");

    const [ user,setUser] = useState({});
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  
    const register = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        alert('Succesfully Registered')
    } catch (error) {
        console.log(error.message);
       alert('Email or Password Invalid')
        

      }
    };

    
    return (
       
        <div className="App">
          <div>
            <h3> Register User </h3>
            <input 
              placeholder="Email..."
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              
            />
            
            <input
              placeholder="Password..."
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
    
            <button aria-label = 'Register' onClick={register}> Create User</button>
            <h4> User Registered:    {user?.email}</h4>
    
          </div>
              
          
          </div>
    
);


}


export default SignUpPage