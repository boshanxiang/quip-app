const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    upvotes: [String],
    downvotes: [String],
    bookmarks: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;