var express = require('express');
var router = express.Router();
const artistController = require('../controllers/artists')

// View all artists
router.get('/', artistController.index);

// Show one artist
router.get('/:id', artistController.show);

module.exports = router;
