const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    user: {type: String, required: true},
    body: {type: String, required: true},
    img: {type: String},
    parent_ID: {type: String, required: true},
    comments: [this] //SELF-REFERENTIAL SCHEMA TO BE USED FOR COMMENTS/SUB-POSTS
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;