import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { PopularMoviesComponent } from './popular-movies.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PopularMoviesComponent', () => {
  let component: PopularMoviesComponent;
  let fixture: ComponentFixture<PopularMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      declarations: [PopularMoviesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
