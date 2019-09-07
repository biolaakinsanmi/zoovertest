import { ReviewModel } from '../_models/review-model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient
  ) { }


  isProcessing: Boolean = null;
  _isProcessing: BehaviorSubject<Boolean> = new BehaviorSubject(this.isProcessing);
  isProcessing$: Observable<Boolean> = this._isProcessing.asObservable();


  /**
   * Get basic statistics about the Accomodation Review
   */
  getStats(){
    return this.http.get(environment.apiBaseUrl + '/get-stats')
  }


  /**
   * Service to fetch reviews form API
   * @param null
   */
  getReviews(
     page: number = 1,
     pageSize: number = 1,
     sort: 'entryDate' | 'travelDate' = 'entryDate',
     dir: 'asc' | 'desc' = 'desc',
     filter: string = null
    ){
    this.updateIsProcessing(true);
    return this.http.get(
      environment.apiBaseUrl + `/get-reviews?p=${page}&size=${pageSize}&sort=${sort}&dir=${dir}${ filter? '&q=' + filter: ''}`
    )
  }


  /**
   * track review request status
   * @param {boolean} val
   */
  updateIsProcessing(val: Boolean){
    this.isProcessing = val;
    this._isProcessing.next(this.isProcessing);
  }
}
