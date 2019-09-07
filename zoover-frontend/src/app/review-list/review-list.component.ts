import { ReviewsService } from './../_services/reviews.service';
import { ReviewModel } from '../_models/review-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';

interface TravelWitKeyI{
  key: string,
  count: number
}

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit, OnDestroy {

  constructor(
    private reviewService: ReviewsService
  ) { }

  filterKey: string = null;

  generalAverage: number = 0;
  averageTraveledWith: string = null;
  totalreviews: number = 0;
  traveledWithKeys: Array<TravelWitKeyI>  = []

  page: number = 1;
  pageSize: number = 10;
  sort: 'entryDate' | 'travelDate' = "entryDate";
  dir: 'asc' | 'desc' = 'desc';

  fetchedReviews: Array<ReviewModel> = [];
  queryTotalReviews: Array<ReviewModel> = [];

  renderedReviews: Array<ReviewModel> = [];

  noFetchedResult: Boolean = false;
  noFilterResultWarning: Boolean = false;

  isProcessing: Boolean = null;
  isProcessing$: SubscriptionLike;

  ngOnInit() {
    //listen reviews loaded...
    this.isProcessing$ = this.reviewService.isProcessing$.subscribe(
      (val: Boolean)=>{
        //get Id from activated route
        this.isProcessing = val;
      }
    )

    //get review stats
    this.reviewService.getStats().subscribe(
      (response: any)=>{
        this.generalAverage = response.generalAverage;
        this.averageTraveledWith = response.averageTraveledWith;
        this.totalreviews = response.totalreviews
        this.traveledWithKeys = response.traveledWithKeys
      },
      (error: any)=>{
        this.reviewService.updateIsProcessing(null)
      }
    )

    //when get reviews...
    this.getReviews();
  }


  /**
   * Get/FIlter rveives by page and sort order
   * @param query
   */
  getReviews(){
    this.reviewService.updateIsProcessing(true);

    this.reviewService.getReviews(
      this.page,
      this.pageSize,
      this.sort,
      this.dir,
      this.filterKey
    ).subscribe(
      (response: any)=>{
        //get service loaded reviews
        this.fetchedReviews = response.fetchedReviews;
        this.queryTotalReviews = response.total;

        //if noresults, enable view alert
        this.noFetchedResult = this.fetchedReviews.length > 0? false: true;

        //TODO disable the filter inputs if no result

        this.reviewService.updateIsProcessing(false);
      },
      (error: any)=>{
        this.reviewService.updateIsProcessing(null)
      }
    )
  }

  /**
   * handle Page Filter
   * @param {string} key filter key
   */
   doFilter(key: string){
    this.filterKey = key;
    this.getReviews();
  }


  /**
   * Page event handler when the paginator is clicked
   * @param $event - event from the mat-paginator directive
   */
  pageEvent($event: any){
    console.log($event)
    this.page = $event;
    this.getReviews();
  }

  /**
   * Sort Data
   * @param sort - column sort
   */
  sortData(sort: 'entryDate' | 'travelDate'){
    this.sort = sort;
    this.getReviews();
  }

  /**
   * Sort Direction
   * @param dir - sot direction
   */
  sortDirection(dir: 'asc' | 'desc'){
    this.dir = dir;
    this.getReviews();
  }

  /**
   * get ket and vlaues of aspect reviews
   * @param obj
   */
  getAspectReviews(obj: any){
    let arr = [];
    for(let key in obj){
      arr.push({
        key: key,
        val: obj[key]
      })
    }

    return arr;
  }

  /**
   * get randome digits for randome avatar
   */
   getRandomeDigits(){
     return Math.floor(100 + Math.random() * 900);
   }

  /**
   * unsubscribe
   */
  ngOnDestroy(){
    if(this.isProcessing$){
      this.isProcessing$.unsubscribe();
    }
  }
}
