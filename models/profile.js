const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    bio: String,
    favoriteArtist: String,
    joinedFestival: [{type: mongoose.Schema.Types.ObjectId, ref: 'Festival'}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tickets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'}],
    // reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    lastLogin: {type: Date, default: Date.now},
    currentStatus: {type: String, default: 'offline'},
    currentMessage: {type: String, default: ''},
    isAdmin: {type: Boolean, default: false}
} , {
    timestamps: true
},
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;




