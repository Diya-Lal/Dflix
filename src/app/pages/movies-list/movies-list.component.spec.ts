import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesListComponent } from './movies-list.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesService } from 'src/app/services/movies.service';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';
import { NgImageSliderModule } from 'ng-image-slider';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule, NgImageSliderModule],
      declarations: [MoviesListComponent, SliderComponent],
      providers: [MoviesService],
    }).compileComponents();
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
