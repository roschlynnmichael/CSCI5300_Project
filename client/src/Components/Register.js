// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from '../Components/Components';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("in the reguistraion function handle");
    e.preventDefault();
    const response = await fetch("http://localhost:5001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      navigate("/login");
      console.log("sucess");
    } else {
      alert("Registration failed");
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    //     <button type="submit">Register</button>
    // </form>
    // <Parent>
      <Components.Container>
        <Components.SignUpContainer>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              name="username"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Components.Input type="email" name="email" placeholder="Email" />
            <Components.Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
      </Components.Container>
    // </Parent>
  );
};

export default Register;
