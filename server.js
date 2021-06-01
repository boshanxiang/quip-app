///DEPENDENCIES AND CONFIGURATION
    //APP DEPENDENCIES
    const express = require('express');
    const mongoose = require('mongoose');
    const methodOverride = require('method-override');

    //USER AUTHENTICATION DEPENDENCIES
    const session = require('express-session');
    // const bcrypt = require('bcrypt');
    const dotenv = require('dotenv').config();

    //APP CONFIGURATION
    const app = express();
    const PORT = process.env.PORT;
    const MONGODBNAME = process.env.MONGODBNAME

    //MIDDLEWARE
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(methodOverride('_method'));
    // app.use(
    //     session({
    //         secret: process.env.SECRET,
    //         resave: false,
    //         saveUnitialized: false
    //     })
    // )

    //MONGOOSE MIDDLEWARE
    mongoose.connect(`mongodb://localhost:27017/${MONGODBNAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    mongoose.connection.once('open', () => {
        console.log('connected to mongo');
    });

    //PUBLIC STATIC FOLDER
    app.use(express.static('public'));

    //CONTROLLER REQUIRE
    const postsController = require('./controllers/posts.js');
    app.use('/posts', postsController);

    //>>>>>>>SESSION LOGIC

        // app.get('/create-session', (req, res) => {
        //     console.log(req.session);
        //     req.session.potato = "tomato";
        //     res.redirect('/fruits');
        // })

        // app.get('/retrieve-session', (req, res) => {
        //     if(req.session.potato === 'tomato') {
        //         console.log('that potato is a tomato');
        //     } else {
        //         console.log('thank god it is not a tomato');
        //     }
        //     res.redirect('/fruits')
        // })

        // app.get('/update-session', (req, res) => {
        //     req.session.potato = 'potato';
        //     console.log(req.session);
        //     res.redirect('/fruits');
        // })

        // app.get('/delete-session', (req, res) => {
        //     req.session.destroy((err) => {
        //         if(err) {
        //             console.log('Something went wrong removing a session')
        //         } else {
        //             console.log('Session removed successfully')
        //         }
        //     });
        //     res.redirect('/fruits');
        // })
    //

    //>>>>>BCRYPT TEST
        // app.get('/test-bcrypt', (req, res) => {
        // const hashedString = bcrypt.hashSync('password', bcrypt.genSaltSync(10))
        // console.log(hashedString);
        // const samePassword = bcrypt.compareSync('wrongPassword', hashedString);
        // console.log(samePassword)
        // })


//APP LISTEN
app.listen(PORT, () => {
    console.log('Server is up and running on port ' + PORT);
});