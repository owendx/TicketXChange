var express = require('express');
var router = express.Router();
const festivalController = require('../controllers/festivals')
const {checkAdmin} = require("../controllers/festivals");
const {isLoggedIn} = require("../controllers/logins");


// Get the form to create a new festival, but
router.get('/new', checkAdmin, festivalController.new);

// Get all festivals
router.get('/', isLoggedIn, festivalController.index);

// Get one festival
router.get('/:id', isLoggedIn, festivalController.show);



// Create a new festival
router.post('/', festivalController.create);

module.exports = router;
