import { useState, useEffect } from "react";

import React from "react";
import axios from "axios";

export default function EditTagPage(props){
    let currTag = props.tagToBeEdited;
    let [tagText, setTagText] = useState(currTag);
    let [error, setError] = useState("* indicated mandatory fields");

    function handleSubmit(e){
        e.preventDefault();
        let errorMessage = "";
        if(tagText === ""){
            errorMessage = "Tag field should not be empty";
        }
        if (errorMessage.length > 0) {
            // Display error message
            setError(errorMessage);
        }
        else{
            
            handleNewTag();
            //let startTime = Date.now();
        }
    }
    async function handleNewTag() {

    }
    async function deleteTag(){
    }
    return(
        <form className="AddAnswerPage_UsernameForm" id="AddAnswerPage_UsernameFormID" onSubmit={(e) => handleSubmit(e)}> 
            <label className="addAnswerPage_AnswerText">Tag*</label> 
            <textarea className="addAnswerPage_AnswerTextInput" id="addAnswerPage_AnswerTextInputID"  value={tagText} onChange={(e) => setTagText(e.target.value)} cols="20" rows="10" placeholder="Enter a tag"></textarea>
            <div className="addAnswerPage_footer">
                <button type="submit" className="addAnswerPage_PostQuestionButton">Edit Tag</button>
                <button type="button" className= "deleteQuestion-Bottom__button" onClick={deleteTag}>Delete</button>
                <div className="addAnswerPage_MandatoryFields">{error}</div>
            </div>
        </form>
        );
}
