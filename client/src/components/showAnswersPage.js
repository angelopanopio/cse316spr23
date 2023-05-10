//import Model from '../models/model.js';
//import { useState } from "react";
import React from 'react';
import getMetaData from './utils.js';
import { useState, useEffect } from "react";
import axios from 'axios';
import { getAnswersListNewest } from './utils.js';


export default function AnswersPage(props) {
    console.log("AnswersPage");
    const [allAnswers, setAllAnswers] = useState();
    const question = props.question;

    

    //question.views += 1; //increment number of views 

    console.log(question);
    console.log('http://localhost:8000/increaseView/' + question._id);

    useEffect(() => {
        axios.get('http://localhost:8000/getAllAnswers')
        .then(function (response) {
          console.log(response?.data);
          setAllAnswers(response?.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        }, []);



        //http://localhost:8000/increaseView/64449619b6d0c7650851711c

    useEffect(() => {
        axios.post('http://localhost:8000/increaseView/' + question._id)
        .then(function (response) {
            console.log(response?.data);
            props.setQuestion(response?.data[0]);
        })
        .catch(function (error) {
            console.log(error);
          });
        }, []);





    console.log(question);

    let startTime = Date.now();
    let isAnswer = false;

    return (
        <div className="answersPage">
            <div className="answersPage_Header">
                <div className="answersPage_NumOfAnswers">{(question.answers.length) === 1? "1 Answer" : question.answers.length + " Answers"} </div>
                <div className="answersPage_QuestionTitle">{question.title}</div>
                <button className="askQuestionButton" onClick={() => {
                                    props.setClicked("AskQuestionPage");
                                }}>Ask Question</button>
            </div>
            <div className="answerPage_QuestionHeader">
                <div className="answersPage_Views">{(question.views) === 1? "1 View" : question.views + " Views"}</div>
                <AnswerText key="answersPage_QuestionText" text={question.text} className="answersPage_QuestionText"/>
                <div className="answersPage_AuthorMetadataContainer">
                    <div className="answersPage_Author"> {question.asked_by} </div>
                    {allAnswers && <div className="answersPage_AuthorMetadata">{getMetaData(startTime, question.ask_date_time, isAnswer)}</div> }
                </div>
            </div>

            {allAnswers && <ShowAnswers question={question} allAnswers={allAnswers} />}
            
            <button className="answersPage_AnswerQuestionButton"onClick={() => {
                                    props.setClicked("AddAnswerPage");
                                    props.setQuestion(question);
                                }}>Answer Question</button>
        </div>
    )
}

function ShowAnswers(props) {
    let startTime = Date.now();
    let isAnswer = true;
    let answersArr = getAnswersListNewest(props.question, props.allAnswers);

    return (
        <div>
            {answersArr.map((currentAns) => (
                <div className="answersPage_AnswerContainer" key={currentAns._id}>
                    <AnswerText key="answersPage_AnswerText" text={currentAns.text} className="answersPage_AnswerText"/>
                    <div className="answersPage_AnswerMetadata">
                        <div className="answersPage_AnswerAuthor">{currentAns.ans_by}</div>
                        <div className="answerPage_AnswerText">
                            {getMetaData(startTime, currentAns.ans_date_time, isAnswer)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function AnswerText(props) {
    const textArr = props.text.split(/\[(.*?)\]\((.*?)\)/);
    return (
        <div className="answersPage_AnswerText">
            {textArr.map((text, index) => {
                if (index % 3 === 1) {
                    // this is the hyperlink text
                    return (
                        <a
                            key={`link-${index}`} // add a unique key to the <a> element
                            href={textArr[index + 1]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {text}
                        </a>
                    );
                } else if (index % 3 === 2) {
                    // this is the hyperlink URL
                    return null; // don't render the URL
                } else {
                    return text;
                }
            })}
        </div>
    );
}