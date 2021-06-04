# Quip App

Quip is a full-stack blog / forum app exemplifying RESTful routes with CRUD functionality.

## Features

Users can create and log into their profiles with encrypted passwords.
Users can create new posts, comment on existing posts, and upvote, downvote, and bookmark posts.
Profile pages for users show posts created and bookmarked by a given user.
Net up/downvotes aggregate and are displayed to all users.

## Approach Taken

-Separate MongoDB database collections for users, posts, and comments.
-Comments were not embedded in posts.
-Votes are tracked in both the user and post records.

## Technologies Used
-Node.js
-Express
-EJS
-Mongoose
-Javascript
-HTML
-CSS
-Bootstrap
-Heroku

## Additional Features to Build

-Ability to infinitely nest comments.
-Functionality to upvote/downvote/bookmark comments.
-Ability to sort posts by net vote score / recency.
-Function to search through posts.
-Group posts by "Community".

## Links
Link to Github repository: https://git.generalassemb.ly/boshanxiang/quip [to be updated to non-Enterprise repo when available]
Link to Heroku deployment: https://quip-app.herokuapp.com/posts