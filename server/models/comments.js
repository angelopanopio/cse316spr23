// Comment Document Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    
    comment_by: {
        type: String ,
        required: true
    },
    text:{
        type : String,
        required: true,
        maxLength: 140
    },
    votes:{
        type: Number,
        default: 0
    },
    url: String
    });

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
