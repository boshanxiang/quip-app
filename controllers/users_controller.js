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
    console.log(req.session.currentUser);
    console.log('above is req.session.currentUser');
    User.find({username: req.session.currentUser.username})
    // User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {upvote: `${req.params.id}`}}, {new: true}, (error, foundUser) => {
    //     if(error) {
    //         console.log(error.message)
    //     } else {
    //     console.log(foundUser);
    //     console.log('above is foundUser');
    //     res.redirect(`/posts/${req.params.id}`);
    //     }
    // });
});

// users.post('/:id/downvote', (req, res) => {
//     User.findOneAndUpdate({name: req.session.currentUser.username}, (err, foundUser) => {
//         foundUser.downvote.push(req.params.id);
//         console.log(foundUser);
//         res.redirect(`/posts/${req.params.id}`);
//     });
// })

// users.post('/:id/bookmark', (req, res) => {
//     User.findOneAndUpdate({name: req.session.currentUser.username}, (err, foundUser) => {
//         foundUser.bookmark.push(req.params.id);
//         console.log(foundUser);
//         res.redirect(`/posts/${req.params.id}`);
//     });
// })

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