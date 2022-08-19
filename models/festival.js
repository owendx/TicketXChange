const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
    festivalName: {type: String, required: true, unique: true},
    festivalDescription: {type: String, required: true},
    festivalDate: {type: Date, required: true},
    festivalLocation: {type: String, required: true},
    festivalImage: {type: String, required: true},
    festivalArtists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}]
}, {
    timestamps: true
    });


const Festival = mongoose.model('Festival', festivalSchema);

module.exports = Festival;