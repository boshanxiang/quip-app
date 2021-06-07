# Quip App

Quip is a full-stack blog / forum app exemplifying RESTful routes with CRUD functionality.

## Features

Users can create and log into their profiles with encrypted passwords.
Users can create new posts, comment on existing posts, and upvote, downvote, and bookmark posts.
Profile pages for users show posts created and bookmarked by a given user.
Net up/downvotes aggregate and are displayed to all users.
Delete/update functionality is limited to the post author.

## Approach Taken

*Adhered to the Models, Views, Controllers file structure.
*Separate MongoDB database collections for users, posts, and comments.
*Comments were not embedded in posts--instead, separate documents for each comment.
*Votes are tracked in both the user and post records.
*Users when logged in can comment on posts, upvote, downvote, and bookmark posts.
*Interactivity panel (voting and bookmark panel) functionality not extended to comments.

## Technologies Used
The following technologies were used:
*Node.js
*DotEnv
*Express
*Express-Session
*EJS
*Method-Override
*Mongoose
*MongoDB
*Javascript
*HTML
*CSS
*Bootstrap / Bootstrap Icons
*Heroku

*mock entries are from Stanford Encyclopedia of Philosophy and Wikipedia.

## Additional Features to Build

*Ability to infinitely nest comments.
*Functionality to upvote/downvote/bookmark comments.
*Ability to sort posts by net vote score / recency.
*Function to search through posts.
*Group posts by "Community".
*Function to avoid having to reload entire page when updating a partial aspect of the page.

## Links
Link to Github repository: https://git.generalassemb.ly/boshanxiang/quip [to be updated to non-Enterprise repo when available]
Link to Heroku deployment: https://quip-app.herokuapp.com/posts