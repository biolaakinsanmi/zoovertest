import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListComponent } from './review-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

fdescribe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;
  let navigateSpy: jasmine.Spy;

  const dataRows = [
    {
      "total": 200,
      "page": 1,
      "pageSize": 1,
      "fetchedReviews": [
        {
          "parents": [
            {
              "id": "96e83a90-48da-4e81-9d06-7f1b76e5364e"
            }
          ],
          "id": "c9fa6d7b-a773-402e-b9cc-a800634484cf",
          "traveledWith": "FAMILY",
          "entryDate": 1252359116000,
          "travelDate": 1252359116000,
          "ratings": {
            "general": {
              "general": 8
            },
            "aspects": {
              "location": 9,
              "service": 0,
              "priceQuality": 9,
              "food": 0,
              "room": 0,
              "childFriendly": 9,
              "interior": 0,
              "size": 0,
              "activities": 0,
              "restaurants": 0,
              "sanitaryState": 0,
              "accessibility": 0,
              "nightlife": 0,
              "culture": 0,
              "surrounding": 0,
              "atmosphere": 0,
              "noviceSkiArea": 0,
              "advancedSkiArea": 0,
              "apresSki": 0,
              "beach": 0,
              "entertainment": 0,
              "environmental": 0,
              "pool": 0,
              "terrace": 0
            }
          },
          "titles": {
            "nl": "perfecte vakantieplek"
          },
          "texts": {
            "nl": "14 dagen bungalowtent gehuurd, perfecte vakantie, weinig last van muggen, voor de kids (3,12,en 16) een paradijsje, nadeel bij de tenten van de touroperator is dat er geen luifel of partytent voorstaat, de plekken hebben weinig tot geen schaduw, dus zelf meenemen. Zeeeer schone toilet en doucheruimtes, zelfs voor de kleintjes een aparte ruimte."
          },
          "user": "M van Dam",
          "locale": "nl",
          "aspectRatingAvg": 1.125
        }
      ]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewListComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    navigateSpy = spyOn(TestBed.get(Router), 'navigate'); // <= init spy
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update page number', () => {
    component.pageEvent(2);
    fixture.detectChanges();

    expect(component.page).toBe(2);
  });

});
