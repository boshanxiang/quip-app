//DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const Post = require('../models/posts.js');

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
    User.find({username: req.session.currentUser.username}, (error, foundUser) => {
        if(error) {
            console.log(error);
        } else {
            if(!foundUser[0].upvotes.some((element) => (element == req.params.id))) {
                req.session.currentUser.upvotes.push(req.params.id);
                User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {upvotes: `${req.params.id}`}}, {new: true}, (error, foundUser) => {
                    if(error) {
                        console.log(error.message)
                    } else {
                    console.log(foundUser);
                    console.log('above is foundUser');
                    res.redirect(`/posts/${req.params.id}`);
                    }
                });
                Post.findByIdAndUpdate(req.params.id, {$inc: {upvotes: 1}}, {new: true}, (error, upvotedPost) => {
                        if(error) {
                            console.log(error.message)
                        } else {
                            console.log(upvotedPost);
                            console.log('above is the upvoted Post');    
                        }
                    })
                if(foundUser[0].downvotes.some((element) => (element == req.params.id))) {
                    req.session.currentUser.downvotes.splice(req.session.currentUser.downvotes.indexOf(req.params.id), 1);
                    User.findOneAndUpdate({username: req.session.currentUser.username}, {$pull: {downvotes: {$in: [req.params.id]}}}, {new: true}, (error, updatedUser) => {
                        console.log(updatedUser);
                        console.log('above is the updated user (downvote removed)');
                    });
                    Post.findByIdAndUpdate(req.params.id, {$inc: {downvotes: -1}}, {new: true}, (error, downvotedPost) => {
                        if(error) {
                            console.log(error.message);
                        } else {
                            console.log(downvotedPost);
                            console.log('above is the updated Post (downvote removed)');
                        }
                    })
                }

            } else {
                res.redirect(`/posts/${req.params.id}`);
            }
        }
    });
});

users.post('/:id/downvote', (req, res) => {
    User.find({username: req.session.currentUser.username}, (error, foundUser) => {
        if(error) {
            console.log(error);
        } else {
            if(!foundUser[0].downvotes.some((element) => (element == req.params.id))) {
                req.session.currentUser.downvotes.push(req.params.id);
                User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {downvotes: `${req.params.id}`}}, {new: true}, (error, foundUser) => {
                    if(error) {
                        console.log(error.message)
                    } else {
                    console.log(foundUser);
                    console.log('above is foundUser');
                    res.redirect(`/posts/${req.params.id}`);
                    }
                });
                Post.findByIdAndUpdate(req.params.id, {$inc: {downvotes: 1}}, {new: true}, (error, downvotedPost) => {
                        if(error) {
                            console.log(error.message)
                        } else {
                            console.log(downvotedPost);
                            console.log('above is the downvoted Post');    
                        }
                    })
                if(foundUser[0].upvotes.some((element) => (element == req.params.id))) {
                    req.session.currentUser.upvotes.splice(req.session.currentUser.upvotes.indexOf(req.params.id), 1);
                    User.findOneAndUpdate({username: req.session.currentUser.username}, {$pull: {upvotes: {$in: [req.params.id]}}}, {new: true}, (error, updatedUser) => {
                        console.log(updatedUser);
                        console.log('above is the updated user (upvote removed)');
                    });
                    Post.findByIdAndUpdate(req.params.id, {$inc: {upvotes: -1}}, {new: true}, (error, upvotedPost) => {
                        if(error) {
                            console.log(error.message);
                        } else {
                            console.log(upvotedPost);
                            console.log('above is the updated Post (upvote removed)');
                        }
                    })
                }

            } else {
                res.redirect(`/posts/${req.params.id}`);
            }
        }
    });
});

users.post('/:id/bookmark', (req, res) => {
    User.find({username: req.session.currentUser.username}, (error, foundUser) => {
        if(error) {
            console.log(error);
        } else {
            if(!foundUser[0].bookmarks.some((element) => (element == req.params.id))) {
                req.session.currentUser.bookmarks.push(req.params.id);
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
                req.session.currentUser.bookmarks.splice(req.session.currentUser.bookmarks.indexOf(req.params.id), 1);
                User.findOneAndUpdate({username: req.session.currentUser.username}, {$pull: {bookmarks: `${req.params.id}`}}, {new: true}, (error, foundUser) => {
                    if(error) {
                        console.log(error.message)
                    } else {
                    console.log(foundUser);
                    console.log('above is foundUser');
                    res.redirect(`/posts/${req.params.id}`);
                    }
                });
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