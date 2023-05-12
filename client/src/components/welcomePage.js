import HomePage from "./homePage.js";
import LoginPage from "./loginPage.js";
import RegisterPage from "./registerPage.js";
import Banner from './banner.js';
import Body from './body.js';
import { useState } from "react";

export default function WelcomePage(props) {
    let {questionList, setQuestionList, allQuestionsTitle, setAllQuestionsTitle, clicked, setClicked} = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            {clicked === "Welcome" && (
                    <WelcomePage
                    setClicked={setClicked}
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    allQuestionsTitle={allQuestionsTitle}
                    setAllQuestionsTitle={setAllQuestionsTitle}
                    />
                )}
                {clicked === "RegisterPage" && (
                    <RegisterPage
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    allQuestionsTitle={allQuestionsTitle}
                    setAllQuestionsTitle={setAllQuestionsTitle}
                    setClicked={setClicked}
                    />
                )}
                {clicked === "LoginPage" && (
                    <LoginPage
                    isLoggedIn = {isLoggedIn}
                    setIsLoggedIn = {setIsLoggedIn}
                    setClicked={setClicked}
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    allQuestionsTitle={allQuestionsTitle}
                    setAllQuestionsTitle={setAllQuestionsTitle}
                    />
                )}
            {isLoggedIn && (
                <div>
                {<Banner questionList = {questionList} setQuestionList = {setQuestionList}
                allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
                clicked={clicked} setClicked={setClicked}/>}
                {<Body questionList = {questionList} setQuestionList = {setQuestionList}
                allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
                clicked={clicked} setClicked={setClicked}/>}
                </div>
            )}
        </div>
        
    );
}
