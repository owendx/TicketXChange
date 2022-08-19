const Festival = require('../models/festival');
const Artist = require('../models/artist');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Profile = require('../models/profile');
const app = require("../server");

module.exports = {
    index,
    show,
    new: newFestival,
    create,
    checkAdmin
}

function checkAdmin(req, res, next) {
    let isAdmin = false;

    // retrieve the Profile model of the user thats logged in
    Profile.findOne({ user: req.user._id }, function(err, profile) {
        let isAdmin;
        if (err) {
        } else {
            console.log('confirming admin status');
            console.log('currently logged in user')
            console.log(req.user.googleId);
            console.log(profile.name);
            console.log(profile.isAdmin)
            isAdmin = profile.isAdmin;
        }

        if (req.isAuthenticated() && isAdmin) {
            next();
        } else {
            res.redirect('/festivals');
        }

});}

// function that returns one festival based on the id
function show(req, res) {

}

// function that returns all festivals
function index(req, res) {
    Festival.find({})
        .exec(function(err, festivals) {
            if (err) {
                // res.redirect('/festivals');
            } else {
                res.render('festivals/index', { festivals });
            }
        }
    );
}


function newFestival(req, res) {
    // send the Profile model to the new.ejs page
    res.render('festivals/new.ejs', { profile: Profile });
}

// create a new festival listing and save it to the database
function create(req, res) {
    let newFestival = new Festival({
        festivalName: req.body.festivalName,
        festivalDescription: req.body.festivalDescription,
        festivalDate: req.body.festivalDate,
        festivalLocation: req.body.festivalLocation,
        festivalImage: req.body.festivalImage,

    });
    newFestival.save(function(err) {
        if (err) {
            res.redirect('/festivals/new');
        } else {
            console.log('new festival listing created!');
            res.redirect('/festivals');
        }
    });
}



