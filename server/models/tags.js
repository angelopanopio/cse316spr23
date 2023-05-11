// Tag Document Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    
    name: {
        type : String ,
        required: true
    },
    users_using_tag: [{type: Schema.Types.ObjectId, ref: "User" }],
    url: String
    });

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
