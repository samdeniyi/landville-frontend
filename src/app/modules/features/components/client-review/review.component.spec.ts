import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { throwError, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { routerSpy, toastServiceSpy, spinnerSpy, clientReviewService } from 'src/app/helpers/tests/spies';

import { ReviewComponent } from 'src/app/modules/features/components/client-review/review.component';

import { configureTestSuite } from 'ng-bullet';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  const mockRouter = routerSpy;
  const mockToastr = toastServiceSpy;
  const mockSpinner = spinnerSpy;
  const mockreviewService = clientReviewService;
  const mockactivatedRoute = routerSpy;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      imports: [
        NgxSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: ActivatedRoute,
          useValue: mockactivatedRoute
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
  });

  it('should create review component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should have a review field', () => {
    expect(component.review).toBeTruthy();
  });
  it('should trigger onsubmit method', async(() => {
    component.submitReview();
    expect(component.submitReview).toBeTruthy();
  }));
  it(' should submit a  review without an error', () => {
    component = new ReviewComponent(mockreviewService, mockSpinner, mockToastr, mockRouter, mockactivatedRoute);
    mockreviewService.createClientReview.and.returnValue(of(true));
    component.submitReview();
    expect(mockreviewService.createClientReview).toHaveBeenCalled();
  });
  it('should toast error if ReviewComponent returns an error', () => {
    component = new ReviewComponent(mockreviewService, mockSpinner, mockToastr, mockRouter, mockactivatedRoute);
    mockreviewService.createClientReview.and.returnValue(throwError({ status: 404, message: 'client not found' }));
    component.submitReview();
    expect(mockToastr.error).toHaveBeenCalled();
  });
  it('should toast error if ReviewComponent returns an error with detail', () => {
    component = new ReviewComponent(mockreviewService, mockSpinner, mockToastr, mockRouter, mockactivatedRoute);
    mockreviewService.createClientReview.and.returnValue(throwError({ status: 404, errors: { detail: undefined } }));
    component.submitReview();
  });
});
