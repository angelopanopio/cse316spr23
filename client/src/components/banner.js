//import Model from '../models/model.js';
//import { useState } from "react";
import React from 'react';
import SearchBar from './searchBar.js';

export default function Banner(props) {
  const {
    questionList,
    setQuestionList,
    allQuestionsTitle,
    setAllQuestionsTitle,
    clicked,
    setClicked
  } = props;
  return (
  <div className="header">

      <div className="emptyHeader"> </div>
      <div className = "headerDetails">
      <div className="pageTitle"> Fake Stack OverFlow </div>
      <SearchBar  questionList = {questionList} setQuestionList = {setQuestionList}
      allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle} 
      clicked={clicked} setClicked={setClicked}/>
      </div>

  </div>
  );
}

/**
 * <SearchBar db = {db} updateDB={updateDB} questionList = {questionList} setQuestionList = {setQuestionList}
      allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle} 
      clicked={clicked} setClicked={setClicked}/>
 */