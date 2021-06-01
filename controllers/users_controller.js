//DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

//MIDDLEWARE
users.use(express.urlencoded({extended: true}));
users.use(express.json());

//ROUTES
users.get('/new', (req, res) => {
    res.render('./users/new_user.ejs', {currentUser: req.session.currentUser});
})

users.get('/login', (req, res) => {
    res.render('./users/login_user.ejs');
})

users.post('/:id/upvote', (req, res) => {
    User.find({username:req.session.currentUser.username}, (error, foundUser) => {
        if(error) {
            console.log(error);
        } else {
            if(!foundUser[0].upvotes.some((element) => (element == req.params.id))) {
                User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {upvotes: `${req.params.id}`}}, {new: true}, (error, foundUser) => {
                    if(error) {
                        console.log(error.message)
                    } else {
                    console.log(foundUser);
                    console.log('above is foundUser');
                    res.redirect(`/posts/${req.params.id}`);
                    }
                });
              
            } else {
                res.redirect(`/posts/${req.params.id}`);
            }
        }
    });
});

users.post('/:id/downvote', (req, res) => {
    User.find({username:req.session.currentUser.username}, (error, foundUser) => {
        if(error) {
            console.log(error);
        } else {
            if(!foundUser[0].downvotes.some((element) => (element == req.params.id))) {
                User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {downvotes: `${req.params.id}`}}, {new: true}, (error, foundUser) => {
                    if(error) {
                        console.log(error.message)
                    } else {
                    console.log(foundUser);
                    console.log('above is foundUser');
                    res.redirect(`/posts/${req.params.id}`);
                    }
                });
              
            } else {
                res.redirect(`/posts/${req.params.id}`);
            }
        }
    });
});

users.post('/:id/bookmark', (req, res) => {
    User.find({username:req.session.currentUser.username}, (error, foundUser) => {
        if(error) {
            console.log(error);
        } else {
            if(!foundUser[0].bookmarks.some((element) => (element == req.params.id))) {
                User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {bookmarks: `${req.params.id}`}}, {new: true}, (error, foundUser) => {
                    if(error) {
                        console.log(error.message)
                    } else {
                    console.log(foundUser);
                    console.log('above is foundUser');
                    res.redirect(`/posts/${req.params.id}`);
                    }
                });
              
            } else {
                res.redirect(`/posts/${req.params.id}`);
            }
        }
    });
});

users.post('/', (req, res) => {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        console.log('User is created', createdUser);
        req.session.currentUser = createdUser;
        res.redirect('/posts');
    });
})

module.exports = users;