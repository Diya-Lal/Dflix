import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    const mockAuthService = {
      loggedInUser: of(null),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        NgImageSliderModule,
      ],
      declarations: [MovieDetailsComponent, SliderComponent],
      providers: [{ provide: AuthenticationService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
