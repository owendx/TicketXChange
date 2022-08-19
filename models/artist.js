const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    artistBio: {type: String, required: true},
    image: {type: String, required: true},
    genres: [{type: String, required: true}],
    website: {type: String, required: true},
    festival: {type: mongoose.Schema.Types.ObjectId, ref: 'Festival'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);
