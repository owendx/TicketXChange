const Festival = require('../models/festival');
const Artist = require('../models/artist');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Review = require('../models/review');
const Profile = require('../models/profile');

module.exports = {
    index,
    show,
    new: newArtist,
    create
}

// function that returns one artist based on the id
function show(req, res) {
    Artist.findById(req.params.id)
        .populate('festivals')
        .populate('tickets')
        .populate('reviews')
        .populate('user')
        .exec(function(err, artist) {
            if (err) {
                res.redirect('/artists');
            } else {
                res.render('artists/show', { artist });
            }
        }
    );
}

// function that returns all artists
function index(req, res) {
    Artist.find({})
        .populate('festivals')
        .populate('tickets')
        .populate('reviews')
        .populate('user')
        .exec(function(err, artists) {
            if (err) {
                res.redirect('/artists');
            } else {
                res.render('artists/index', { artists });
            }
        }
    );
}

// function that returns the new artist form
function newArtist(req, res) {
    res.render('artists/new.ejs');
}

// function that creates a new artist
function create(req, res) {
    console.log(req.body);
    Artist.create(req.body, function(err, artist) {
        if (err) {
            res.redirect('/artists/new');
        } else {
            res.redirect('/artists');
        }
    }
);
}
