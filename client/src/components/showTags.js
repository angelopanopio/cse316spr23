import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { getNumQuestionsWithTag, getArrQuestionsWithTag } from './utils';

export default function ShowTags(props){
    const tagArr = props.tags;
    const questions = props.questions;
    const {isEditingTag = false, user = null, setTagToBeEdited} = props;
    setTagToBeEdited("TESTING");
    let outArr = [];
    let row = [];
    let rowNum = 0;
    let col = 0;
    if(tagArr){
        for(let i = 0; i < tagArr.length; i ++)
        {
            col += 1;
            let tag = tagArr[i];
            let tagContainer = {
                name: tag.name, 
                num: String(getNumQuestionsWithTag(questions, tag._id)),
                tid : tag._id
                };
            
            //console.log(tagContainer.num);
            row.push(tagContainer);

            //console.log(col);

            
            if (col === 3){
                
                outArr.push(<TagRow key={rowNum} arr={row} tags={props.tags} user={user} isEditingTag={isEditingTag} questions={props.questions} setClicked={props.setClicked} setQuestion={props.setQuestion}
                    tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>)

                col = 0;
                row = [];
                rowNum += 1;
            }
            
            else if (i === tagArr.length - 1){ //last tag
                outArr.push(<TagRow key={rowNum} arr={row} tags={props.tags} user={user} isEditingTag={isEditingTag} questions={props.questions} setClicked={props.setClicked} setQuestion={props.setQuestion} 
                    tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>)

            }


        }
    }
    

    //console.log(outArr);

    return React.createElement("div", {}, outArr);
}

function TagRow(props){
    let tags = props.arr;
    let {isEditingTag, user, setTagToBeEdited} = props;
    //console.log(tags[0].tid);
    if(tags.length === 1 ){
        return(<div className="tagPage_TagRow">
                <Tag  key={tags[0].tid} tags={props.tags} user={user} isEditingTag={isEditingTag} questions={props.questions} tid={tags[0].tid} name={tags[0].name} num={tags[0].num} tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <div className="tagPage_PlaceHolder"></div>
                <div className="tagPage_PlaceHolder"></div>
                </div>

        );
    }

    if (tags.length === 2){
        return(<div className="tagPage_TagRow">
                <Tag  key={tags[0].tid} tags={props.tags} user={user} isEditingTag={isEditingTag} questions={props.questions} tid={tags[0].tid} name={tags[0].name} num={tags[0].num} tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <Tag  key={tags[1].tid} tid={tags[1].tid} name={tags[1].name} num={tags[1].num} tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <div className="tagPage_PlaceHolder"></div>
                </div>

        );
    }

    if (tags.length === 3){
        return(<div className="tagPage_TagRow">
                <Tag  key={tags[0].tid} tags={props.tags} user={user} isEditingTag={isEditingTag} questions={props.questions} tid={tags[0].tid} name={tags[0].name} num={tags[0].num} tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <Tag  key={tags[1].tid} tags={props.tags} user={user} isEditingTag={isEditingTag} questions={props.questions} tid={tags[1].tid} name={tags[1].name} num={tags[1].num} tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <Tag  key={tags[2].tid} tags={props.tags} user={user} isEditingTag={isEditingTag} questions={props.questions} tid={tags[2].tid} name={tags[2].name} num={tags[2].num} tagToBeEdited={props.tagToBeEdited} setTagToBeEdited={setTagToBeEdited} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                </div>

        );
    }

}

function Tag(props) {
    const { tags, user, isEditingTag, tid, name, num, setAllQuestionsTitle, setTagToBeEdited, setClicked, setQuestion, setHighlightQuestion, setHighlightTags, setQuestionList } = props;
    
    const [editableTag, setEditableTag] = useState([]);
    
    if(user && isEditingTag){
        axios.get('http://localhost:8000/getNonEditableUserTags/' + user.userId,{
            params:{
                tags: tags
            }
        })
        .then(response => {
            // handle the response data
            const nonEditabletags = response.data;
            tags.filter(tag => !nonEditabletags.some(({ name }) => name === tag.name));
            const nonEditabletagsSet = new Set(nonEditabletags);
            
           setEditableTag(tags.filter(tag => !nonEditabletagsSet.has(tag.name)));
            
        })
        .catch(error => {
            // handle the error
            console.error(error); 
        });
    }
    
    const handleEdit = (name) => {
      console.log(name);
      console.log(props.tagToBeEdited);
      setTagToBeEdited(name);
      setClicked("EditTagPage");
    };
  
    const handleDelete = () => {
      // handle delete logic here
    };

    return (
      <div className="tagPage_TagContainer">
        <div
          className="tagPage_TagName"
          onClick={isEditingTag ? () => {} : () => {
            setAllQuestionsTitle(`Questions with tag "${name}"`);
            setClicked("allQuestions");
            setHighlightQuestion(null);
            setHighlightTags([tid]);
            setQuestionList(getArrQuestionsWithTag(props.questions, tid));
          }}
        >
          {name}
        </div>
        <div className="tagPage_TagNum">{num} questions</div>
        {isEditingTag && editableTag.some(tag => tag.name === name) && (
          <div className="tagPage_TagButtons">
            <button onClick={() => handleEdit(name)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      {isEditingTag && !editableTag.some(tag => tag.name === name) && (
        <div className="tagPage_TagButtonsNonEditable">
          Non-editable: Tag used by another user
        </div>
      )}
  </div>
    );
  }
  