import LoginPage from "./loginPage.js";
import RegisterPage from "./registerPage.js";

export default function WelcomePage(props) {
    let {questionList, setQuestionList, allQuestionsTitle, setAllQuestionsTitle, clicked, setClicked} = props;
    return (
        <div>
            <header>Welcome to Fake Stack Overflow!</header>
            <div id="welcome-buttons">
                <button onClick={() => setClicked("RegisterPage")}>Register</button>
                <button onClick={() => setClicked("LoginPage")}>Login</button>
                <button onClick={() => setClicked("HomePage")}>Continue as Guest</button>
            </div>
            {questionList &&  <div className="bodyContent">
                {clicked === "RegisterPage" && <RegisterPage questionList = {questionList} setQuestionList = {setQuestionList}
                allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
                clicked={clicked} setClicked={setClicked}/>}
                {clicked === "LoginPage" && <LoginPage questionList = {questionList} setQuestionList = {setQuestionList}
                allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
                clicked={clicked} setClicked={setClicked}/>}
                {clicked === "t" && <LoginPage questionList = {questionList} setQuestionList = {setQuestionList}
                allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
                clicked={clicked} setClicked={setClicked}/>}
            </div>}
        </div>
        
    );
}
