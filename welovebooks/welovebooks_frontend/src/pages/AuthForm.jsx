import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { signUp, signIn } from "../utilities";


const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const { setUser } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                setUser(await signUp(email, password));
            } else {
                setUser(await signIn(email, password));
            }
        } catch (error) {
            console.error(isSignUp ? "Sign-up failed" : "Sign-in failed", error);
        }
    };

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
                <div className="mb-3">
                    <label htmlFor="formEmail" className="form-label">Email address</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="formEmail"
                        aria-describedby="emailHelp"
                        required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="formPassword" className="form-label">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="formPassword"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary ms-3"
                    onClick={() => setIsSignUp(!isSignUp)}
                >
                    {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
