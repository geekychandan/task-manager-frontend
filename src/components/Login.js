import React, { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import BASE_URL from '../config/config';

export default function Login({ setIsRegistering, isRegistering }) {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext);

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  // const url='http://localhost:5000/users/login'


  const LOGIN_URL = `${BASE_URL}/users/login`;

  const handleSubmit=async(event)=>{
    event.preventDefault();

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token ,name} = await response.json();
        localStorage.setItem("token", token);
        setUser({ email ,name});
        setRedirect(true);
      } else {
        const { message } = await response.json();
        setErrorMessage(message);
        console.log(message)
      }
    } catch (error) {
      setErrorMessage("Wrong Credentials given,Please try again");
      // console.log("Something went wrong. Please try again later.")

    }

  }

  useEffect(() => {
    if (redirect) {
      history.push("/dashboard");
    }
  }, [redirect, history]);

  return (
    <>
    <p style={{color:"white"}}>{errorMessage}</p>
    <form  onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="inputbox">
        <FaEnvelope />
        <input type="email" value={email}
          onChange={handleEmailChange} required />
        <label htmlFor="">Email</label>
      </div>
      <div className="inputbox">
        <FaLock />
        <input type="password" value={password}
          onChange={handlePasswordChange} required />
        <label htmlFor="">Password</label>
      </div>
      <button>Log in</button>
      <div className="register">
        <p>
          Don't have a account{" "}
          <a href="#" onClick={toggleRegister}>
            Register
          </a>
        </p>
      </div>
    </form>
    </>
  );
}
