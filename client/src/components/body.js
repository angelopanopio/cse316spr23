//import Model from '../models/model.js';
import HomePage from './homePage.js';
import AnswersPage from './showAnswersPage.js';
import TagsPage from './tagsPage.js';
import AddAnswerPage from './addAnswerPage';
import UserProfile from './userProfile.js';
import { AskQuestionPage } from './askQuestion.js';
import { useState, useEffect } from "react";
import axios from 'axios';
//import { highlightQuestion, highlightTag } from './utils.js';


export default function Body(props) {

  let {user, questionList, setQuestionList, allQuestionsTitle, setAllQuestionsTitle, clicked, setClicked} = props;
  //questionList - used for what questions to show in the homepage
  const [question, setQuestion] = useState(); //state for changing question
  const [highlightTags, setHighlightTags] = useState(false); // state for highlighing Tags
  const [highlightQuestion, setHighlightQuestion] = useState(true); //state for highlighting question
  const [highlightUserProfile, setHighlightUserProfile] = useState(false);


  async function displayAllQuestions(){
    setQuestionList(null);
    const updatedQuestionList = await axios.get("http://localhost:8000/getAllQuestions");
    setQuestionList(updatedQuestionList.data);
  }

  return (
    <div className="body">
        <div className="leftMenu">
            <div className="questionLink" style={{backgroundColor: highlightQuestion && "grey"}} onClick={() => {
                                    displayAllQuestions();
                                    setHighlightTags(false);
                                    setHighlightQuestion(true);
                                    setHighlightUserProfile(false);
                                    setAllQuestionsTitle("");
                                    setClicked("HomePage");
                                }}>Questions</div>
            <div className="tagsLink" style={{backgroundColor: highlightTags && "grey"}}  onClick={() => {
                                    
                                    setHighlightTags(true);
                                    setHighlightQuestion(false);
                                    setHighlightUserProfile(false);
                                    setAllQuestionsTitle("");
                                    setClicked("TagsPage");
                                }}>Tags</div>
            <div className="UserProfileLink" style={{backgroundColor: highlightUserProfile && "grey"}}  onClick={() => {
                            setHighlightTags(false);
                            setHighlightQuestion(false);
                            setHighlightUserProfile(true);
                            setAllQuestionsTitle("");
                            setClicked("UserProfile");
                        }}>User Profile</div>
        </div>

      {user && questionList &&  <div className="bodyContent">
          {clicked === "HomePage" && <HomePage user={user} questions={question} setQuestion={setQuestion} allQuestionsTitle={allQuestionsTitle} setAllQuestionsTitle={setAllQuestionsTitle} 
          setClicked={setClicked}  questionList={questionList} setQuestionList={setQuestionList}/>}
          {clicked === "AnswerPage" && <AnswersPage user={user} question={question} setClicked={setClicked} setQuestion={setQuestion}/>}
          {clicked === "AddAnswerPage" && <AddAnswerPage  question={question} setClicked={setClicked} setQuestion={setQuestion}/>}
          {clicked === "AskQuestionPage" && <AskQuestionPage  setClicked={setClicked} 
          setQuestion={setQuestion} setAllQuestionsTitle={setAllQuestionsTitle} questionList={questionList} setQuestionList={setQuestionList} />}
          {clicked === "TagsPage" && <TagsPage  setClicked={setClicked} setAllQuestionsTitle={setAllQuestionsTitle} questionList={questionList} setQuestionList={setQuestionList}
          setHighlightQuestion={setHighlightQuestion} setHighlightTags={setHighlightTags}/>}
          {clicked === "UserProfile" && <UserProfile  setClicked={setClicked} setAllQuestionsTitle={setAllQuestionsTitle} questionList={questionList} setQuestionList={setQuestionList}
          setHighlightQuestion={setHighlightQuestion} setHighlightTags={setHighlightTags} setHighlightUserProfile={setHighlightUserProfile}/>}
        </div>}
    </div>
  );
}


