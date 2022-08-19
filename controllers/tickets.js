const Festival = require('../models/festival');
const Artist = require('../models/artist');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Profile = require('../models/profile');
const formatDistance = require('date-fns/formatDistance');

module.exports = {
    index,
    show,
    new: newTicket,
    create,
    destroy,
    isOwnTicket,
    update
}

// console log all incoming req.body data
function update(req, res) {
    console.log(req.body)
    console.log(req.body.price)
    console.log(req.body.paid)

    // now update the ticket listing with the new price with the req.body.price value
    Ticket.findByIdAndUpdate(req.params.id, {
        price: req.body.price,
    // update the updatedAt field of the ticket listing to the current time
        updatedAt: new Date(),
    // update the paid field of the ticket listing to the paidStatus variable
        paid: req.body.paid


    }, function(err) {
        if (err) {
            res.redirect('/tickets');
        } else {
            // redirect to the page of the ticket listing that was just updated
            res.redirect('/tickets/' + req.params.id);
            // res.redirect('/tickets');
        }
    });
}


// check if the ticket being viewed is the user's own ticket
function isOwnTicket(req, res, next) {
    if (req.isAuthenticated()) {
        Ticket.findById(req.params.id, function(err, ticket) {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                if (ticket.postedBy.equals(req.user._id)) {
                    next();
                } else {
                    console.log('you are not authorized to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

// function that returns one ticket listing based on the id
function show(req, res) {
// retrieve the id of the currently logged in user from the User model, but only if the user is logged in
    if (req.user) {
        User.findOne({ _id: req.user._id })
            .exec(function(err, user) {
                if (err) {}
                // else console.log(user);
            })
    }

    Ticket.findOne({ _id: req.params.id })
        .exec(function(err, ticket) {
            if (err) {
                res.redirect('/tickets');
            } else {

                let sellerID = ticket.postedBy;
                let sellerName = '';

                // find the user who posted the ticket listing by matching the 'sellerID' value
                // with the 'user' value in the Profile collection
                Profile.findOne({ user: sellerID })
                    .exec(function(err, profile) {
                        if (err) {
                            console.log('error finding profile');
                        } else {
                            if (req.user) {
                                User.findOne({ _id: req.user._id })
                                    .exec(function(err, user) {
                                        if (err) {}
                                        else {
                                            let isOwnTicket = ticket.postedBy.equals(user._id);
                                            sellerName = profile.name;
                                            // use the formatDistance function to calculate the distance between the current time and the time of the ticket listing
                                            let timeDiff = formatDistance(new Date(), ticket.createdAt);
                                            // use the formatDistance function to calculate the distance between the current time and the time of the updatedAt field of the ticket listing
                                            let updatedTimeDiff = formatDistance(new Date(), ticket.updatedAt);
                                            res.render('tickets/show', { ticket, sellerName, isOwnTicket, timeDiff, updatedTimeDiff});
                                        }
                                    })
                            }

                        }
                    });

            }
        });
}

// function that returns all tickets
function index(req, res) {
    Ticket.find({})
        .populate('sellerProfile')
        .populate('postedBy')
        .exec(function(err, tickets) {
                if (err) {
                    // res.redirect('/festivals');
                } else {
                    // retrieve all the profiles in the profile collection
                    Profile.find({})
                        .exec(function(err, profiles) {
                            if (err) {
                                console.log('error finding profiles');
                            } else {
                                // convert the tickets.createdAt value to a more readable format using formatDistance
                                tickets.forEach(function(ticket) {
                                    ticket.createdAtFormatted = formatDistance(new Date(), ticket.createdAt);
                                });
                                // convert the tickets.updatedAt value to a more readable format using formatDistance
                                tickets.forEach(function(ticket) {
                                    ticket.updatedAtFormatted = formatDistance(new Date(), ticket.updatedAt);
                                });
                                res.render('tickets/index', { tickets, profiles });
                            }
                        });
                    // res.render('tickets/index', { tickets });
                }
            }
        );
}

// function that returns the new ticket listing form
function newTicket(req, res) {
    // direct to the new ticket form
    res.render('tickets/new');
}

// create a new ticket listing and save it to the database
function create(req, res) {
    // retrieve the Profile model of the user thats logged in
    Profile.findOne({ user: req.user._id })
        .exec(function(err, profile) {
            let newTicket = new Ticket({
                festival: req.body.festival,
                // set postedBy to the currently logged in user
                postedBy: req.user._id,
                // set sellerProfile to the _id of the Profile document that matches the currently logged in user
                sellerProfile: profile._id,
                price: req.body.price,
                // set createdAt to the current time
                createdAt: new Date()
            });
            newTicket.save(function(err) {
                if (err) {
                    res.redirect('/tickets/new');
                } else {
                    // redirect to the page of the ticket listing that was just created
                    res.redirect('/tickets/' + newTicket._id);

                }
            });
        });
}

// delete/remove a ticket listing from the database based on its id
function destroy(req, res) {
    Ticket.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/tickets');
        } else {
            res.redirect('/tickets');
        }
    });
}

