///DEPENDENCIES AND CONFIGURATION
    //APP DEPENDENCIES
    const express = require('express');
    const mongoose = require('mongoose');
    const methodOverride = require('method-override');

    //USER AUTHENTICATION DEPENDENCIES
    const dotenv = require('dotenv').config();
    const session = require('express-session');
    const bcrypt = require('bcrypt');

    //APP CONFIGURATION
    const app = express();
    const PORT = process.env.PORT || 3000;
    const MONGODB_URI = process.env.MONGODB_URI

    //MIDDLEWARE
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(methodOverride('_method'));
    app.use(
        session({
            secret: process.env.SECRET,
            resave: false,
            saveUnitialized: false
        })
    )

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

        //Posts Controller
        const postsController = require('./controllers/posts_controller.js');
        app.use('/posts', postsController);

        //Users Controller
        const userController = require('./controllers/users_controller.js');
        app.use('/users', userController);

        //Sessions Controller
        const sessionsController = require('./controllers/sessions_controller.js');
        app.use('/sessions', sessionsController);

//APP LISTEN
app.listen(PORT, () => {
    console.log('Server is up and running on port ' + PORT);
});