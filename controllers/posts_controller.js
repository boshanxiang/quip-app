//DEPENDENCIES
    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');

//MODELS IMPORT
    const Post = require('../models/posts.js');
    const seedPosts = require('../models/seed_posts.js');
    const seedUsers = require('../models/seed_users.js');
    const Comment = require('../models/comments.js');
    const User = require('../models/users.js');


    const isAuthenticated = (req, res, next) => {
        if (req.session.currentUser) {
          return next()
        } else {
          res.redirect('/sessions/new')
        }
      }

//ROUTES

    //INDEX ROUTE
        router.get('/', (req, res) => {
            Post.find({}, (error, allPosts) => {
                if(error) {
                    console.log(error);
                } else {
                    res.render('index.ejs', {
                        posts: allPosts,
                        pageTitle: 'Index',
                        currentUser: req.session.currentUser
                    })
                };
            });
        });
    
    //JSON ROUTE
        router.get('/json', (req, res) => {
            Post.find({}, (error, allPosts) => {
                res.send(allPosts);
            });
        });

    //SEED ROUTE
        router.get('/seed', async(req, res) => {
            try{
                const plantPosts = await Post.create(seedPosts);
                const plantUsers = await User.create(seedUsers)
                res.redirect('/posts');
            } catch (err) {
                res.send(err.message);
            }
        });

    //NEW ROUTE
        router.get('/new', isAuthenticated, (req, res) => {
            res.render('new.ejs', {
                pageTitle: 'New Post',
                currentUser: req.session.currentUser
            })
        })

    //CREATE POST ROUTE
        router.post('/', isAuthenticated, (req, res) => {
            req.body.user = req.session.currentUser.username;
            Post.create(req.body, (error, createdPost) => {
                User.findOneAndUpdate(
                    {username: req.session.currentUser.username},
                    {$push: {userPosts: createdPost.id}},
                    {new: true},
                    (error, newPostUser) => {
                        if(error) {
                            console.log(error.message)
                        }
                    }
                )
                res.redirect(`/posts/${createdPost.id}`)
            });
        });


    //CREATE COMMENT ROUTE
        router.post('/:id', isAuthenticated, (req, res) => {
            req.body.parent_ID = req.params.id;
            req.body.user = req.session.currentUser.username;
            Comment.create(req.body, (error, createdComment) => {
                res.redirect(`/posts/${req.params.id}`);
            });
        })

    //SHOW ROUTE
        router.get('/:id', (req, res) => {
            Post.findById(req.params.id, (error, foundPost) => {
                    if(error) {
                        console.log(error.message);
                    } else {
                        Comment.find({parent_ID: req.params.id}, (error, foundComments) => {
                            res.render('show.ejs', {
                                post: foundPost,
                                foundComments: foundComments,
                                pageTitle: foundPost.title,
                                currentUser: req.session.currentUser
                            });
                        })
                    }
            });
        });

    //DELETE POST ROUTE
        //CONSIDER WHETHER ONLY USER SHOULD HAVE ABILITY TO DELETE POST
        router.delete('/:id', isAuthenticated, (req, res) => {
            Post.findByIdAndRemove(req.params.id, (error, deletedPost) => {
                res.redirect('/posts');
            })
        })


    //EDIT SHOW ROUTE
        router.get('/:id/edit', isAuthenticated, (req, res) => {
            Post.findById(req.params.id, (error, foundPost) => {
                res.render('edit.ejs', {
                    post: foundPost,
                    pageTitle: foundPost.title,
                    currentUser: req.session.currentUser
                });
            });
        });

    //PUT EDITED POST ROUTE
        router.put('/:id', isAuthenticated, (req, res) => {
            Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedPost) => {
                res.redirect(`/posts/${updatedPost.id}`);
            });
        });

    //DELETE COMMENT ROUTE

    //EDIT COMMENT SHOW ROUTE

    //PUT EDITED COMMENT ROUTE


//

module.exports = router;