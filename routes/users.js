var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const {isLoggedIn} = require("../controllers/logins");

// Get all users on the platform
router.get('/', isLoggedIn, userController.index);

// Show one user profile
router.get('/:id', isLoggedIn, userController.show);

// Get the form to create a new user profile
router.get('/new', isLoggedIn, userController.new);

// Create a new user profile
router.post('/', isLoggedIn, userController.create);



module.exports = router;
