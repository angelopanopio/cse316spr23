import React from 'react'
import axios from 'axios'
import { useState } from "react";

export default function LoginPage(props) {
    
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    let [error, setError] = useState("");
    
    async function handleLogin(event){
        let errorMessage = "";
        const emailRegex = /\w+@\w+.\w+/
        event.preventDefault();
        console.log("test");
        if(emailRegex.exec(email) && pwd.length > 0) {
            let login = {
                email: email,
                password: pwd
            }
            try {
                await axios.post("http://localhost:8000/login", login);
                props.setIsLoggedIn(true);
                props.setClicked("HomePage");
            } catch (error) {
                console.log(error.response.data.message);
                errorMessage = error.response.data.message;
            }
        } else {
            if(emailRegex.exec(email) == null) errorMessage = "Email is invalid";
            if(pwd.length === 0) errorMessage = "Password cannot be blank";
        }
        if (errorMessage.length > 0) {
            // Display error message
            setError(errorMessage);
        }
    }
    return (
        <form id="login-Form" method="post">
            <div className="login-Form-error-messages-container">
                <span id = "login-Form-error-messages">{error}</span>
            </div>
            <h1>Email address</h1>
            <input
                className="form_input"
                autoComplete="off"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            ></input>
            <br /><br />
            <h1>Password</h1>
            <input
                type={"password"}
                className="form_input"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
            ></input>
            <br /><br />
            <input type="submit" id="submit" value="Login" onClick={(event) => handleLogin(event)} />
        </form>
    );
}