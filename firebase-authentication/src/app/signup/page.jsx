"use client";

import axios from "axios";
import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/signup`, { password: password, email: email });
            setMessage('SignUp Successfully');

        } catch (error) {
            console.log(error);
            setMessage(error.response.data.error || error.message);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
            <p>{message}</p>
        </div>
    );
};