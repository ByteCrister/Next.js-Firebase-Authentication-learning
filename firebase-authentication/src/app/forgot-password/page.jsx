"use client"
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleForgotPassword = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/forgot-password`, { email });
      
      // Check if the response is successful
      if (res.status === 200) {
        setMessage("Password reset email sent!");
      } else {
        setMessage(res.data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Email</button>
      <p>{message}</p>
    </div>
  );
}