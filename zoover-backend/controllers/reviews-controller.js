import utils from '../utils/utils';

const allReviews = require('../reviews.json');
var avgTraveledWith = 0;

class ReviewsController {
  static async getStats(req, res, next){
    let avg = null, traveledWithKeys = [];
    [avg, avgTraveledWith, traveledWithKeys] = await utils.getGeneralStats(allReviews); // get average General Rating Value
  
    return res.status(200).send(
      { 
        generalAverage: avg,
        averageTraveledWith: avgTraveledWith,
        totalreviews: allReviews.length,
        traveledWithKeys: traveledWithKeys
      }
    );
  }

  static async getReviews(req, res, next){
    let reviewSetWithAvgs;
    const { p, size, sort, q, dir} = req.query;
  
    let page = +(utils.validatePage(p));
    let pageSize = +(utils.validatePageSize(size));
    let sortField = utils.validateSortField(sort);

    let sortDirection = utils.validateDirection(dir);
    let query = (q === null) || (q=== undefined) || q.toString().length < 1 ? null : q;

    let sortedReviews = await utils.sortReviews([... allReviews], sortField, sortDirection);

    let cloneArray = null;

    if(query){
      let filtered = await utils.filterReviews(sortedReviews, query);
      cloneArray = [...filtered];
    }
    else{
      cloneArray = [...sortedReviews];
    }

    let startIndex = (page - 1) * pageSize;
  
    reviewSetWithAvgs = await utils.calcAvgAspectsRating(cloneArray.slice(startIndex, startIndex + pageSize)); //Get Each review's average aspect rating
    
    return res.status(200).send(
      { 
        total: cloneArray.length,
        page: page,
        pageSize: pageSize,
        fetchedReviews: reviewSetWithAvgs
      });
  }

}

export default ReviewsController;