const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');
const Profile = require('../models/profile');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    auth: {
        params: {
            prompt: 'select_account'
        }
    }
  },
  function(accessToken, refreshToken, profile, cb) {
    // passport callback function
    //   console.log('passport callback function fired!!!!!');
    //   console.log(profile);

      // check if user already exists in our own database
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have the user
                // console.log('USER ALREADY EXISTS, LOGGING IN....');
                // console.log('user is: ' + currentUser);
                // update the value of the 'lastLogin' field in the profile model to the current time
                Profile.findOne({user: currentUser._id}, function (err, profile) {
                    if (err) {}
                    else {
                        // set profile.lastLogin to the current time
                        profile.lastLogin = new Date();
                        // save the profile model
                        profile.save();
                    }
                });
                return cb(null, currentUser);
            }
            else {
                // if not, create a new user and save to database
                // console.log('NEW USER DETECTED, CREATING A NEW RECORD....');
                new User({
                    email: profile.emails[0].value,
                    googleId: profile.id,
                }).save().then((newUser) => {
                    // console.log('new user created: ' + newUser);
                    // console.log('now creating a new profile for the new user');
                    // create a new profile for the new user
                    new Profile({
                        // set the name of the new profile to the name of the new user in Google object
                        name: profile.displayName,
                        // set 'createdAt' to the current time
                        createdAt: new Date(),
                        // attach the new user to the new profile
                        user: newUser._id,
                        // set last login to the current time
                        lastLogin: new Date()
                    }).save().then((newProfile) => {
                        // console.log('new profile created: ' + newProfile);
                        return cb(null, newUser);
                    });
                    // return cb(null, newUser);
                })
            }
        })
  }
));

passport.serializeUser(function(user, done) {
   done(null, user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})



