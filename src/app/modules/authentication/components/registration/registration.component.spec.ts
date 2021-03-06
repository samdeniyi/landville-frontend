import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from 'src/app/modules/authentication/components/registration/registration.component';
import {
  RegisterFormComponent
} from 'src/app/modules/authentication/components/registration/register-form/register-form.component';
import {
  RegisterHeaderComponent
} from 'src/app/modules/authentication/components/registration/register-header/register-header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RegisterServiceService } from 'src/app/services/register/register-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RegistersuccessComponent
} from 'src/app/modules/authentication/components/registration/registersuccess/registersuccess.component';
import {
  registerServiceSpy,
  resetSpies,
  toastServiceSpy
} from 'src/app/helpers/tests/spies';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeAll(() => resetSpies([registerServiceSpy]));
  afterEach(() => resetSpies([registerServiceSpy]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent,
        RegisterFormComponent,
        RegisterHeaderComponent,
        RegistersuccessComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NgxSpinnerModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        {
          provide: RegisterServiceService,
          useValue: registerServiceSpy
        },
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test registering a user and return right response ', () => {
    const User = {
      email: 'akram@andela.com',
      first_name: 'akram',
      last_name: 'mukasa',
      role: 'CA',
      password: 'akram100',
      confirmed_password: 'akram100',
      data: ''
    };
    const response = {
      data: {
        user: {
          email: 'akram@nator.com',
          first_name: 'akram',
          last_name: 'mukasa',
          role: 'CA'
        },
        message:
          'Account created successfully,please check your mailbox to activate your account ',
        status: 'success'
      }
    };

    registerServiceSpy.registerUser.and.returnValue(of(response));
    component.registerUser(User);
    expect(toastServiceSpy.success).toHaveBeenCalledWith(response.data.message);
  });

  it('should throw error', () => {
    const User = {
      email: 'akram@andela.com',
      first_name: 'akram',
      last_name: 'mukasa',
      role: 'CA',
      password: 'akram100',
      confirmed_password: 'akram100',
      data: ''
    };
    const errorMessage = {
      error: {
        errors: {
          email: ['Email is undefined']
        }
      }
    };
    registerServiceSpy.registerUser.and.returnValue(throwError(errorMessage));
    component.registerUser(User);
    expect(toastServiceSpy.error).toHaveBeenCalledWith(
      errorMessage.error.errors.email[0]
    );
  });
});
