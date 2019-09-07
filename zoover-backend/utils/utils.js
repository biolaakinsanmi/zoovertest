export default {
  /**
   * Calculate the Average General rating on all reviews; also get the traveledWith value; 
   */
   getGeneralStats: async function (allReviews){
    let generalSum = 0; //stores sum of al/ general ratings
    let traveledWithValues = []; //track and group similar travelWith property value

    // if no reveiwsreturn 0;
    if(!allReviews || allReviews.length < 1) return 0;

    //clone reviews
    let cloneReviews = [...allReviews];

    //loop all reviews
    cloneReviews.forEach( el => {
      //keep adding every general rating value
      generalSum = generalSum + (+el.ratings.general.general);  

      //get all travelWith Values in an array
      if(traveledWithValues[el.traveledWith]){
        traveledWithValues[el.traveledWith]++; 
      }
      else{
        traveledWithValues[el.traveledWith] = 1;
      }
    });

    //calculate and set avgTraveledWith value
    let [avgTraveledWith, traveledWithKeys] = await exports.default.calcAverageTravelledWith(traveledWithValues);

    return [generalSum / cloneReviews.length, avgTraveledWith, traveledWithKeys]; //return average: total general sum / number of items
  },
  

  /**
  * 
  * @param {Calculate average travelWith value in reviews. This is the most occured travelWith value in all reviews} traveledWithValues 
  */
  calcAverageTravelledWith: function(traveledWithValues){
    //making it a sortable object
    let sortableTraveledWith = [];
    for( let [key, count] of Object.entries(traveledWithValues)){
      sortableTraveledWith.push({key: key, count: count }) ;
    }

    //sort in descending order
    sortableTraveledWith.sort((a,b)=>{
      return b.count - a.count;
    })

    //Group traveledWith by values and number of occurrence
    let groupedTraveledWithKeys = sortableTraveledWith.reduce(function(groupingArray, item) {
      (groupingArray[item.count] = groupingArray[item.count] || []).push(item.key);
      return groupingArray;
    }, {});

    //Get Average Travelled
    let mostOccuredCount = sortableTraveledWith[0].count;
    return [groupedTraveledWithKeys[mostOccuredCount.toString()].join(', '), sortableTraveledWith];
  },


  /**
  * Calculate average aspect rating on each review in the fetched set.
  * @param {Review[]} reviewSet 
  */
  calcAvgAspectsRating: function async (reviewSet){ 
    //loop review set....
    reviewSet.forEach( review => {
      let aspectRatingSum = 0;  //track sum of aspect rating values

      //loop every aspect rating property
      for(const key of Object.keys(review.ratings.aspects)){
        aspectRatingSum = aspectRatingSum + (+review.ratings.aspects[key]);  //sum up values
      }

      let theAverage = aspectRatingSum / Object.keys(review.ratings.aspects).length

      //add new object property 'aspectRatingAvg' to every review object
      review['aspectRatingAvg'] = theAverage;
    });

    return reviewSet;
  },

  /**
   * Sort reviews by field
   * @param {Review[]} reviews 
   * @param {string} field 
   */
  sortReviews: function (reviews, field, dir){

    if(dir === 'asc'){
      reviews.sort((a, b)=>{
        return (a[field] < b[field])? -1 : 1;
      });
    }
    else{
      reviews.sort((a, b)=>{
        return (a[field] < b[field])? 1 : -1;
      });
    }

    return reviews;
  },


  /**
  * filter query for on traveledWith field
  * @param {string} q
  */
  filterReviews: (reviews, q)=>{
    let filtered = reviews.filter((el)=>{
      return el.traveledWith.toLowerCase().includes(q.toLowerCase());
    });

    return filtered;
  },


  /**
  * validate sortField
  * @param {string} field
  */
  validateSortField: function (field){
    return field = field !== 'travelDate' &&  field !== 'entryDate'? 'entryDate' : field;
  },


  /**
  * validate sort direction
  * @param {string} dir
  */
  validateDirection: function (dir){
    return dir = (dir !== 'asc' &&  dir !== 'desc')? 'asc' : dir;
  },


  /**
  * validate page number
  * @param {number} page 
  */
  validatePage: function (page){
    return page = isNaN(+page) || (+page) < 1? 1 : +page;
  },


  /**
   * validate page size
   * @param {number} size 
   */
  validatePageSize: function (size){
    return size = isNaN(+size) || (+size) < 1? 10 : +size;
  }
}