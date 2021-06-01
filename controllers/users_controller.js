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
    res.render('./users/new_user.ejs');
})

users.post('/', (req, res) => {
    console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        console.log('User is created', createdUser);
        res.redirect('/posts')
    })
})

module.exports = users;