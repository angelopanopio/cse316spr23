import { useState, useEffect } from "react";

import axios from 'axios';
import React from 'react';
import getMetaData from "./utils";
import EditQuestionPage from "./editQuestionPage";


export default function UserProfile(props){
    let user = props.user;
    const[userRep, setUserRep] = useState();
    const[regDate, setRegDate] = useState();
    const [questionsAsked, setQuestionsAsked] = useState([]);
    const [userMap, setUserMap] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [clickedUser, setClickedUser] = useState(null);
    const [clickedUserRep, setClickedUserRep] = useState();
    const [clickedUserRegDate, setClickedUserRegDate] = useState();
    const [clickedUserQuestions, setClickedUserQuestions] = useState([]);

    let startTime = Date.now();
    console.log(user);
    // on page load
    useEffect(() => {
        axios.get('http://localhost:8000/getReputation/' + user.userId)
        .then(function (response) {
          // console.log(response?.data[0].reputation);
          setUserRep(response?.data[0].reputation);
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get('http://localhost:8000/getRegisterDate/' + user.userId)
        .then(function (response) {
          // console.log(response?.data[0].register_date);
          setRegDate(response?.data[0].register_date);
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get('http://localhost:8000/getQuestions/' + user.userId)
        .then(function (response) {
          // console.log(response?.data);
          setQuestionsAsked(response?.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get('http://localhost:8000/checkAdmin/' + user.userId)
        .then(function (response) {
          const admin = response?.data?.[0]?.admin;
          setIsAdmin(Boolean(admin));
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get('http://localhost:8000/getAllUsers')
        .then(response => {
          setUserMap(response.data);
        })
        .catch(error => {
          console.error(error);
        });  
        }, []);

    const handleUserClick = async (userId) => {
        setClickedUser(userId);
        axios.get('http://localhost:8000/getReputation/' + userId)
        .then(function (response) {
          // console.log(response?.data[0].reputation);
          setClickedUserRep(response?.data[0].reputation);
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get('http://localhost:8000/getRegisterDate/' + userId)
        .then(function (response) {
          // console.log(response?.data[0].register_date);
          setClickedUserRegDate(response?.data[0].register_date);
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get('http://localhost:8000/getQuestions/' + userId)
        .then(function (response) {
          console.log(response?.data);
          setClickedUserQuestions(response?.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return (
      <div>    
        {!isAdmin && (
          <div>
            <div> User Register Date: {getMetaData(startTime,regDate, false).replace('ago', '').replace('asked','')}</div>
            <div> User Repuation: {userRep} </div>
            <div> Questions Asked: </div>
            {questionsAsked && <UserQuestions questionsAsked={questionsAsked} setClicked={props.setClicked} setQuestion={props.setQuestion}/>}
            <div>Questions that you Answered: </div>
            <div>Your Tags: </div>
          </div>
        )}
        {isAdmin && clickedUser === null && (
          <div>
              <div>User Register Date: {getMetaData(startTime, regDate, false).replace('ago', '').replace('asked','')}</div>
              <div>User Reputation: {userRep}</div>
              <div>User Map:</div>
              <ul>
                {Object.keys(userMap).map(userId => (
                  <li key={userId} onClick={() => handleUserClick(userId)}>{userId}: {userMap[userId]}</li>
                ))}
              </ul>
          </div>
        )}
        {isAdmin && clickedUser !== null && clickedUser !== user._id && (
            <div>
                <div> Admin view on User</div>
                <div>User Register Date: {getMetaData(startTime, clickedUserRegDate, false).replace('ago', '').replace('asked','')}</div>
                <div>User Reputation: {clickedUserRep}</div>
                <div>Questions Asked:</div>
                <UserQuestions questionsAsked={clickedUserQuestions} setClicked={props.setClicked} setQuestion={props.setQuestion} userId={clickedUser} />
            </div>
        )}
        </div>
    );    
}

function UserQuestions(props){
    
    let questionsAsked = props.questionsAsked
    console.log(questionsAsked);
    let elements = [];
    for(let i = 0; i < questionsAsked.length; i++){
    let e = <div className="questionTitle" key={questionsAsked[i]._id} onClick={ () => {
                props.setClicked("EditQuestionPage");
                props.setQuestion(questionsAsked[i]);
            }} > {questionsAsked[i].title} </div>;

    elements.push(e);
    }

    console.log(elements);
    
    let out = React.createElement("div", {}, elements);
    return out
}

function UserAnswers(props){


}

function UserTags(props){


}

/*
The page displays a menu as described in
the home use case. In the main section of the
page, the length of time the user has been a
member of fake stack overflow and the
reputation of the user is shown. Below this
information, a set of question titles asked by
the user is listed. Each question title is a link
which when clicked shows the New question
page. In this page the user can modify the
existing question and post it again or delete it.
The form displays the existing information for
the question in appropriate fields. Note
posting modifications is not considered a new
question. Deleting a question will delete all
answers and comments associated with it.
The menu also shows links to view all tags
created and all questions answered by the
user. When a link is clicked, the
corresponding set of tags and answered
questions are listed.
The set of tags are displayed in the same
format as described in the Tags page. Each
entry in the list of tags being displayed has an
option for the user to delete or edit the tag. If
a user deletes a tag, it will not be shown with
a question. However, a tag can be edited or
18
deleted only if it is not being used by any
other user.
The questions answered by the user are
displayed in the same format as Newest
questions in the Home page. Clicking a
question link shows the answers page for that
question. Their answer/s for the question is
displayed first followed by the rest in Newest
order. A user can edit or delete the answer. If
a user deletes an answer then all its votes
and comments are also deleted. The changes
should be reflected in the home page and
questions page appropriately
*/