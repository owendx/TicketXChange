const mongoose = require('mongoose');

// Create your User Model

const userSchema = new mongoose.Schema(
    {
        email: String,
        googleId: String,
        profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;


