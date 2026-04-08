import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
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
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: Auth, useValue: mockAuth }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
