const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
    res.render('./users/login_user.ejs');
});

sessions.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (error, foundUser) => {
        if(error) {
            console.log(error.message);
            res.send('<a href="/users/login"> Error, please try again. </a>');
        } else if (!foundUser) {
            res.send('<a href="/users/login"> Sorry no user found. Please try again. </a>')
        } else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/posts');
            } else {
                res.send('<a href="/users/login"> Password does not match. Please try again. </a>');
            }
        }
    });
});

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/posts')
    });
});

module.exports = sessions;