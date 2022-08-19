const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    price: {type: Number, required: true},
    // festival: {type: mongoose.Schema.Types.ObjectId, ref: 'Festival'},
    festival: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    sellerProfile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    paid: {type: Boolean, default: false},
    paidAt: {type: Date},
    code: {type: String}
});


const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;