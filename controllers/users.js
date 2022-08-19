const Festival = require('../models/festival');
const Artist = require('../models/artist');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Profile = require('../models/profile');

module.exports = {
    index,
    show,
    updateProfile,
    update,
    editProfile
}

// function that returns one user based on the id
function show(req, res) {
    User.findById(req.params.id)
        .populate('festivals')
        .populate('tickets')
        .populate('reviews')
        .populate('profile')
        .exec(function(err, user) {
            if (err) {
                res.redirect('/users');
            } else {
                res.render('users/show', { user });
            }
        }
    );
}

// function that returns all users
function index(req, res) {
    User.find({})
        .populate('festivals')
        .populate('tickets')
        .populate('reviews')
        .populate('profile')
        .exec(function(err, users) {
            if (err) {
                res.redirect('/users');
            } else {
                res.render('users/index', { users });
            }
        }
    );
}

// function that returns the update profile page
function updateProfile(req, res) {
    res.render('users/new.ejs');
}

// function that updates the profile
function update(req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        if (err) {
            res.redirect('/users/new');
        } else {
            res.redirect('/users');
        }
    })
}

// function that returns the profile page of the user thats logged in
function editProfile(req, res) {
    res.render('profile', { user: req.user });
}

