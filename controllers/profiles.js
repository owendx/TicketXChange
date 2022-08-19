const Festival = require('../models/festival');
const Artist = require('../models/artist');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Profile = require('../models/profile');
const formatDistance = require('date-fns/formatDistance');
const format = require('date-fns/format');

module.exports = {
    editProfile,
    show
}

function diff_hours(dt2, dt1)
{
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}

// function that returns the profile page of the user thats logged in
function editProfile(req, res) {
    if (req.user) {
        // retrieve the 'name' of the user thats logged in from the profile model and save it to a variable
        Profile.findOne({user: req.user._id}, function (err, profile) {

            if (err) {
                console.log(err);
            } else {
                // retrieve the lastLogin field from the profile model and save it to a variable
                let lastLogin = profile.lastLogin;
                // calculate the time difference between the current time and the Profile lastLogin field and save it to a variable, using
                // diff_hours function
                let timeDiff = diff_hours(new Date(), lastLogin);
                // if timeDiff is less than 30 minutes, update the profile.currentStatus field to 'online'
                if (timeDiff < 2 ) {
                    profile.currentStatus = 'online';
                    // save the profile model
                    profile.save();
                }
                // else set currentStatus to 'offline'
                else {
                    profile.currentStatus = 'offline';
                    // save the profile model
                    profile.save();
                }
                // run formatDistance function on the createdAt field of the profile model and save it to a variable
                // set the profile.createdAt field to the createdAt variable
                profile.createdAtFormatted = format(profile.createdAt, 'yyyy-mm-dd');

                // retrieve all tickets in the ticket model that have a 'sellerProfile' field that equals the id of the profile
                Ticket.find({sellerProfile: profile._id})
                    .populate('sellerProfile')
                    .exec(function (err, tickets) {
                        if (err) {}
                        else {
                            // render the profile page with the user's name
                            console.log(tickets);
                            res.render('profile', {profile: profile, tickets}, );
                        }
                    });

            }
        });
    }
    else {
        res.redirect('/');
    }
}


// function that returns the profile page of a user with the given id
function show(req, res) {

    // retrieve the id of the profile from the req and use it to find the profile in the profile model
    Profile.findOne({_id: req.params.id})
        .populate('user')
        .exec(function (err, profile) {
            if (err) {
                console.log(err);
            } else {
                // retrieve the lastLogin field from the profile model and save it to a variable
                let lastLogin = profile.lastLogin;
                // calculate the time difference between the current time and the Profile lastLogin field and save it to a variable, using
                // diff_hours function
                let timeDiff = diff_hours(new Date(), lastLogin);
                // if timeDiff is less than 30 minutes, update the profile.currentStatus field to 'online'
                if (timeDiff < 2) {
                    profile.currentStatus = 'online';
                    // save the profile model
                    profile.save();
                }
                // else set currentStatus to 'offline'
                else {
                    profile.currentStatus = 'offline';
                    // save the profile model
                    profile.save();
                }
                // run formatDistance function on the createdAt field of the profile model and save it to a variable
                // set the profile.createdAt field to the createdAt variable
                profile.createdAtFormatted = format(profile.createdAt, 'yyyy-mm-dd');

                // retrieve all tickets in the ticket model that have a 'sellerProfile' field that equals the id of the profile
                Ticket.find({sellerProfile: profile._id})
                    .populate('sellerProfile')
                    .exec(function (err, tickets) {
                        if (err) {}
                        else {
                            // render the profile page with the user's name
                            console.log(tickets);
                            res.render('profile', {profile: profile, tickets}, );
                        }
                    });

            }
        });

}
