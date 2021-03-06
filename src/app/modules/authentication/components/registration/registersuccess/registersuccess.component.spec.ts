import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RegistersuccessComponent
} from 'src/app/modules/authentication/components/registration/registersuccess/registersuccess.component';

describe('RegistersuccessComponent', () => {
  let component: RegistersuccessComponent;
  let fixture: ComponentFixture<RegistersuccessComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersuccessComponent ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
