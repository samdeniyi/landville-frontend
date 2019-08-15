import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  PropertyDetailComponent
} from 'src/app/components/property-details/property-detail/property-detail.component';

describe('PropertyDetailComponent', () => {
  let component: PropertyDetailComponent;
  let fixture: ComponentFixture<PropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});