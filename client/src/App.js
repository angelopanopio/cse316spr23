// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
//import FakeStackOverflow from './components/fakestackoverflow.js'
import Banner from './components/banner';
import Body from './components/body';
import welcomePage from './components/welcomePage';
// import Model from './models/model';
import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';
import WelcomePage from './components/welcomePage';

export default function App() {
  const [questionList, setQuestionList] = useState(); //state changing shown questions
  const [allQuestionsTitle, setAllQuestionsTitle] = useState(""); //use this to set the title
  const [clicked, setClicked] = useState("HomePage"); //state for changing Pages
  

 // useEffect hook to update the questionList state whenever the questionList is changed in mongo.
 /** 
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
  axios.get('http://localhost:8000/getAllQuestions')
  .then(function (response) {
    //console.log(response?.data);
    setQuestionList(response?.data);
  })
  .catch(function (error) {
    console.log(error);
  });
**/
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
      {questionList && <WelcomePage questionList = {questionList} setQuestionList = {setQuestionList}
      allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle}
      clicked={clicked} setClicked={setClicked}/>}
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