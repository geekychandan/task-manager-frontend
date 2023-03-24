import React, { useState } from "react";
import background from "./background6.jpg";
import Login from "./Login";
import "./LoginForm.css";
import Register from "./Register";

export default function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(true);

  return (
    <section style={{ backgroundImage: `url(${background})` }}>
      <div className="form-box">
        <div className="form-value">
          {isRegistering ? (
            <Register
              setIsRegistering={setIsRegistering}
              isRegistering={isRegistering}
            />
          ) : (
            <Login
              setIsRegistering={setIsRegistering}
              isRegistering={isRegistering}
            />
          )}
        </div>
      </div>
    </section>
  );
}
