//DEPENDENCIES
    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');

//MODELS IMPORT
    const Post = require('../models/posts.js');
    const seedPosts = require('../models/seed.js');

//ROUTES

    //INDEX ROUTE
        router.get('/', (req, res) => {
            Post.find({}, (error, allPosts) => {
                if(error) {
                    console.log(error);
                } else {
                    res.render('index.ejs', {
                        posts: allPosts, // WILL NEED TO ADD/PASS USER OBJECT
                        pageTitle: 'Index'
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
                const seedItems = await Post.create(seedPosts);
                res.send(seedItems);
            } catch (err) {
                res.send(err.message);
            }
        });

    //NEW ROUTE
        router.get('/new', (req, res) => {
            res.render('new.ejs', {
                pageTitle: 'New Post' // WILL NEED TO ADD/PASS USER OBJECT
            })
        })

    //CREATE POST ROUTE
        router.post('/', (req, res) => {
            Post.create(req.body, (error, createdPost) => {
                res.redirect(`/posts/${createdPost.id}`)
            });
        });

    //CREATE COMMENT ROUTE
        router.post('/:id', (req, res) => {
            console.log(req.body);
            Post.findByIdAndUpdate
        })

    //SHOW ROUTE
        router.get('/:id', (req, res) => {
            Post.findById(req.params.id, (error, foundPost) => {
                res.render('show.ejs', {
                    post: foundPost, //WILL NEED TO ADD/PASS USER OBJECT
                    pageTitle: foundPost.title
                });
            });
        });

    //DELETE POST ROUTE
        //CONSIDER WHETHER ONLY USER SHOULD HAVE ABILITY TO DELETE POST
        router.delete('/:id', (req, res) => {
            Post.findByIdAndRemove(req.params.id, (error, deletedPost) => {
                res.redirect('/posts'); //CONSIDER WHETHER TO PASS USER OBJECT IN ORDER TO AUTHENTICATE DELETE AUTHORITY
            })
        })


    //EDIT SHOW ROUTE
        router.get('/:id/edit', (req, res) => {
            Post.findById(req.params.id, (error, foundPost) => {
                res.render('edit.ejs', {
                    post: foundPost,
                    pageTitle: foundPost.title
                });
            });
        });

    //PUT EDITED POST ROUTE
        router.put('/:id', (req, res) => {
            Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedPost) => {
                res.redirect(`/posts/${updatedPost.id}`);
            });
        });

    //DELETE COMMENT ROUTE

    //EDIT COMMENT SHOW ROUTE

    //PUT EDITED COMMENT ROUTE


//

module.exports = router;