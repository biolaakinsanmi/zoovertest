import ReviewsController from '../controllers/reviews-controller';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Roover Test Api.');
});

/* GET Accomodation Basic Statistics. */
router.get('/get-stats', ReviewsController.getStats);

/* GET Accomodation Reviews. */
router.get('/get-reviews', ReviewsController.getReviews);

module.exports = router;
