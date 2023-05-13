import axios from 'axios';
import React from 'react';

export default function WelcomePage(props) {
    let {setClicked, setIsLoggedIn} = props;
    async function handleGuestLogin() {

        try {
            await axios.post("http://localhost:8000/loginGuest");
        } catch (error) {
            console.log(error.response.data.message);
        }
        setIsLoggedIn(true);
        setClicked("HomePage");
    }
    return (
        <div>
            <header>Welcome to Fake Stack Overflow!</header>
            <div id="welcome-buttons">
                <button onClick={() => setClicked("RegisterPage")}>Register</button>
                <button onClick={() => setClicked("LoginPage")}>Login</button>
                <button onClick={handleGuestLogin}>Continue as Guest</button>
            </div>
        </div>
        
    );
}
