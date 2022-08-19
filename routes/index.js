const router = require('express').Router();
const passport = require('passport');
const express = require('express');
const Profile = require("../models/profile");
const User = require("../models/user");

// The root route renders our only view
router.get('/', function(req, res) {
    //UPDATE THIS
    // Where do you want to go for the root route
    // in the student demo this was res.redirect('/movies'), what do you want?
    // This could be a landing page, or just redirect to your main resource page which you'll have an a tag that makes
    // a request to `/auth/google` route below

    // retrieve the profile of the user thats logged in from the imported Profile model and save it to
    // a variable named profile
    // check if the user is logged in using the User model
    if (req.user) {
        Profile.findOne({ user: req.user._id }, function(err, profile) {
            if (err) {
                console.log(err);
            } else {
                // render the index page with the user's info and profile data
                res.render('index', { user: req.user, profile: profile });
            }
        });
    }
    else {
        res.render('index', { user: req.user, profile: Profile });
    }


    // render the index.ejs view in the views folder, and check if the user is logged in
    // if they are, then pass the user to the view
    // // if they are not, then pass an empty object to the view, also pass the Profile model to the view

    // res.render('index', { user: req.user });
    // res.render('index', {req: req});
});


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/tickets', // UPDATE THIS, where do you want the client to go after you login
    failureRedirect : '/' //  UPDATE THIS, where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(){ //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect('/') // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
  })
})


module.exports = router;
