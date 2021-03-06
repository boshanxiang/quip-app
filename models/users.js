const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    upvotes: Array,
    downvotes: Array,
    bookmarks: Array,
    userPosts: Array
});

const User = mongoose.model('User', userSchema);

module.exports = User;