import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth } from '@angular/fire/auth';
import { MaterialModule } from 'src/app/material.module';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    const mockAuth = {
      onAuthStateChanged: jasmine
        .createSpy('onAuthStateChanged')
        .and.callFake((cb: (user: null) => void) => {
          cb(null);
          return () => {};
        }),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: Auth, useValue: mockAuth }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
