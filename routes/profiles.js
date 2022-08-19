var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profiles')
const userController = require("../controllers/users");
const {isLoggedIn} = require("../controllers/logins");


// Show the user's own profile

router.get('/', isLoggedIn, profileController.editProfile);

// show the profile of a user with the given id
router.get('/:id', isLoggedIn, profileController.show);

module.exports = router;