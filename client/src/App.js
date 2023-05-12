// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
//import FakeStackOverflow from './components/fakestackoverflow.js'
import Banner from './components/banner';
import Body from './components/body';
import LoginPage from "./components/loginPage.js";
import RegisterPage from "./components/registerPage.js";
import WelcomePage from './components/welcomePage';
// import Model from './models/model';
import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';

export default function App() {
  const [questionList, setQuestionList] = useState(); //state changing shown questions
  const [allQuestionsTitle, setAllQuestionsTitle] = useState(""); //use this to set the title
  const [clicked, setClicked] = useState("WelcomePage"); //state for changing Pages
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  axios.get('http://localhost:8000/getAllQuestions')
  .then(function (response) {
    console.log(response?.data);
    setQuestionList(response?.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  }, []);
  
  //dont need db
  return (
    <section className="fakeso">
      {!isLoggedIn && questionList && <div className="bodyContent"> 
        {clicked === "WelcomePage" && (
          <WelcomePage
          setClicked={setClicked}
          questionList={questionList}
          setQuestionList={setQuestionList}
          allQuestionsTitle={allQuestionsTitle}
          setAllQuestionsTitle={setAllQuestionsTitle}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />)}
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
      </div>}
      {isLoggedIn && questionList && <div className="bodyContent"> 
        <Banner questionList = {questionList} setQuestionList = {setQuestionList}
        allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
        clicked={clicked} setClicked={setClicked}/>
        <Body questionList = {questionList} setQuestionList = {setQuestionList}
        allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
        clicked={clicked} setClicked={setClicked}/>
      </div>}
    </section>
  );
}
 /**{questionList && <Banner questionList = {questionList} setQuestionList = {setQuestionList}
      allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
      clicked={clicked} setClicked={setClicked}/>}
      {questionList && <Body questionList = {questionList} setQuestionList = {setQuestionList}
      allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
      clicked={clicked} setClicked={setClicked}/>}
      **/