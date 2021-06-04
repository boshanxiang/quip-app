const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    user: {type: String, required: true}, //query whether this should be user-id when available;
    created: Date,
    body: {type: String, required: true},
    img: {type: String},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0}
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;