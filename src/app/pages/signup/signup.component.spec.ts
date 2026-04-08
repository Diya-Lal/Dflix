import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    const mockAuthService = {
      signUp: jasmine.createSpy('signUp').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: AuthenticationService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
