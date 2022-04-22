const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictedTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictedTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictedTo('user', 'admin'),
    reviewController.deleteReview
  );
module.exports = router;
