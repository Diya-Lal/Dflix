import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { ɵAngularFireSchedulers } from '@angular/fire';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    const mockAuth = {
      onAuthStateChanged: jasmine
        .createSpy('onAuthStateChanged')
        .and.callFake((cb: (user: null) => void) => {
          cb(null);
          return () => {};
        }),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
    };

    TestBed.configureTestingModule({
      providers: [
        ɵAngularFireSchedulers,
        { provide: Auth, useValue: mockAuth },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
