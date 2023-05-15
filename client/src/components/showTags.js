import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { getNumQuestionsWithTag, getArrQuestionsWithTag } from './utils';

export default function ShowTags(props){
    const tagArr = props.tags;
    const questions = props.questions;

    console.log(questions);
    console.log(tagArr[1]._id);
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
                
                outArr.push(<TagRow key={rowNum} arr={row} tags={props.tags} questions={props.questions} setClicked={props.setClicked} setQuestion={props.setQuestion}
                    setAllQuestionsTitle={props.setAllQuestionsTitle} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>)

                col = 0;
                row = [];
                rowNum += 1;
            }
            
            else if (i === tagArr.length - 1){ //last tag
                outArr.push(<TagRow key={rowNum} arr={row} tags={props.tags} questions={props.questions} setClicked={props.setClicked} setQuestion={props.setQuestion} 
                    setAllQuestionsTitle={props.setAllQuestionsTitle} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>)

            }


        }
    }
    

    //console.log(outArr);

    return React.createElement("div", {}, outArr);
}

function TagRow(props){
    let tags = props.arr;
    //console.log(tags[0].tid);
    if(tags.length === 1 ){
        return(<div className="tagPage_TagRow">
                <Tag  key={tags[0].tid} tags={props.tags} questions={props.questions} tid={tags[0].tid} name={tags[0].name} num={tags[0].num} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <div className="tagPage_PlaceHolder"></div>
                <div className="tagPage_PlaceHolder"></div>
                </div>

        );
    }

    if (tags.length === 2){
        return(<div className="tagPage_TagRow">
                <Tag  key={tags[0].tid} tags={props.tags} questions={props.questions} tid={tags[0].tid} name={tags[0].name} num={tags[0].num} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <Tag  key={tags[1].tid} tid={tags[1].tid} name={tags[1].name} num={tags[1].num} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <div className="tagPage_PlaceHolder"></div>
                </div>

        );
    }

    if (tags.length === 3){
        return(<div className="tagPage_TagRow">
                <Tag  key={tags[0].tid} tags={props.tags} questions={props.questions} tid={tags[0].tid} name={tags[0].name} num={tags[0].num} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <Tag  key={tags[1].tid} tags={props.tags} questions={props.questions} tid={tags[1].tid} name={tags[1].name} num={tags[1].num} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                <Tag  key={tags[2].tid} tags={props.tags} questions={props.questions} tid={tags[2].tid} name={tags[2].name} num={tags[2].num} setAllQuestionsTitle={props.setAllQuestionsTitle}
                setClicked={props.setClicked} setQuestion={props.setQuestion} setHighlightQuestion={props.setHighlightQuestion} setHighlightTags={props.setHighlightTags} setQuestionList={props.setQuestionList}/>
                </div>

        );
    }

}

function Tag(props){ // Need to change ALl questions to like Questions with "tag"
    return(<div className="tagPage_TagContainer">
                <div className="tagPage_TagName" onClick={() =>{
                props.setQuestionList(getArrQuestionsWithTag(props.questions, props.tid))
                props.setHighlightQuestion(true);
                props.setHighlightTags(false);
                props.setClicked("HomePage");
                props.setAllQuestionsTitle(props.name);
                }}>{props.name}</div>
                <div className="tagePage_TagNum">{props.num + " questions"}</div>
            </div>);

}