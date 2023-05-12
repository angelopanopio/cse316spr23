import React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react";

export default function LoginPage(props) {
    let {questionList, setQuestionList, allQuestionsTitle, setAllQuestionsTitle, clicked, setClicked} = props;
    
    
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(true);
    let [error, setError] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("test");
    }
    return (
        <form id="login-Form" method="post">
            <div className={success ? "offscreen" : "error_message"}>
                <span style={{ color: "red" }}>{error}</span>
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
            <input type="submit" id="submit" value="Login" onClick={handleSubmit} />
        </form>
    );
}