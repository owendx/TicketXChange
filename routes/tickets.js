var express = require('express');
var router = express.Router();
const ticketController = require('../controllers/tickets');
const {isLoggedIn} = require("../controllers/logins");

// Update the price of the ticket
router.put('/:id', isLoggedIn,  ticketController.update);

// Get the form to create a new ticket listing
router.get('/new', isLoggedIn, ticketController.new);

// Get all ticket listings
router.get('/', isLoggedIn, ticketController.index);

// Show one ticket listing
router.get('/:id', isLoggedIn,  ticketController.show);

// Create a new ticket listing
router.post('/', isLoggedIn, ticketController.create);

// Delete a ticket listing
router.delete('/:id', [isLoggedIn, ticketController.isOwnTicket], ticketController.destroy);



module.exports = router;
