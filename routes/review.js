const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const checkReviewAuthorization = require('../middlewares/checkReviewAuthorization');

router.get('/', checkReviewAuthorization, reviewController.getAllReviews);
router.post('/', checkReviewAuthorization, reviewController.createReview);
router.put('/:id', checkReviewAuthorization, reviewController.updateReview);
router.delete('/:id', checkReviewAuthorization, reviewController.deleteReview);


module.exports = router;
