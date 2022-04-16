const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');

// => TOURS
const router = express.Router();
// TOUR STATS
router.route('/tour-stats').get(tourController.getTourStats);
// MONTHLY PLANS
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
// TOP 5 CHEAPS
router
  .route('/top-5-cheaps')
  .get(tourController.alliasTopTours, tourController.getAllTours);
// GET ALL TOURS AND CREATE TOURS
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTours);
// GET TOURS WITH DIFFERENT QUERY AND WITH ID
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTours)
  .delete(
    authController.protect,
    authController.restrictedTo('admin', 'lead-guide'),
    tourController.deleteTours
  );

module.exports = router;
