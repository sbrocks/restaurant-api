const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const checkListingAuthorization = require('../middlewares/checkListingAuthorization');

router.get('/', checkListingAuthorization, listingController.getAllListings);
router.post('/', checkListingAuthorization, listingController.createListing);
router.put('/:id', checkListingAuthorization, listingController.updateListing);
router.delete('/:id', checkListingAuthorization, listingController.deleteListing);

module.exports = router;
