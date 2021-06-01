const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    user: {type: String, required: true}, //query whether this should be user-id when available;
    body: {type: String, required: true},
    img: {type: String},
    comments: [this] //SELF-REFERENTIAL SCHEMA TO BE USED FOR COMMENTS/SUB-POSTS
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;