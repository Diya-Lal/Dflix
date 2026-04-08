import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

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
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        NgImageSliderModule,
      ],
      declarations: [MovieDetailsComponent, SliderComponent],
      providers: [{ provide: Auth, useValue: mockAuth }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
