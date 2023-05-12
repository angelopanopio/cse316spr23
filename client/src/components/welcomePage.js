export default function WelcomePage(props) {
    let {setClicked, setIsLoggedIn} = props;
    const handleGuestLogin = () => {
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
