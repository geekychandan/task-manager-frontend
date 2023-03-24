import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
// import background from "./background6.jpg";
// import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import BASE_URL from '../config/config';

function Register({ setIsRegistering, isRegistering }) {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();


  const handleNameChange = (event) => setName(event.target.value)
  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value);
  
const SIGNUP_URL = `${BASE_URL}/users/signup`;

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:name,
        email: email,
        password: password
      }),
    });
    if (response.ok) {
      // User created successfully, redirect to login page
      setIsRegistering(!isRegistering);
      setEmail('');
      setPassword('');
    } else {
      const error = await response.json();
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  

  // function registerUser(e) {
  //   e.preventDefault();
  //   setRedirect(true);
  // }

  // useEffect(() => {
  //   if (redirect) {
  //     history.push("/dashboard");
  //   }
  // }, [redirect, history]);


  return (
    <form onSubmit={handleSignup}>
      <h2> Register</h2>
      <div className="inputbox">
        <input type="text" required value={name} onChange={handleNameChange}/>
        <label>Username</label>
      </div>
      <div className="inputbox">
        <FaEnvelope />
        <input type="email" required value={email} onChange={handleEmailChange} />
        <label>Email</label>
      </div>
      <div className="inputbox">
        <FaLock />
        <input type="password" required value={password} onChange={handlePasswordChange} />
        <label>Password</label>
      </div>
      <button>Register</button>
      <div className="register">
        <p>
          Already have an account?{" "}
          <a href="#" onClick={toggleRegister}>
            Login
          </a>
        </p>
      </div>
    </form>
  );
}

export default Register;
