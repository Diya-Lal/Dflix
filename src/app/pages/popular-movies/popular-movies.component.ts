import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LANGUAGES, MovieDetails, Movies } from 'src/app/shared/modals/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss'],
})
export class PopularMoviesComponent implements OnInit, OnDestroy {
  public barChartLegend = true;
  public barChartPlugins = [];
  public popularMovies!: Movies;
  public languages = LANGUAGES;
  public movieLanguage = this.languages[0].id;
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  private destroy$ = new Subject<void>();

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPopularMovies('en-US');
  }

  public getPopularMovies(language: string) {
    this.moviesService
      .getPopularMovies(language)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Movies) => {
        this.popularMovies = response;
        this.formatDataForChart(response.results);
      });
  }

  public formatDataForChart(popularMovies: MovieDetails[]) {
    this.barChartData = {
      labels: popularMovies.map((movie) => movie.original_title),
      datasets: [
        {
          data: popularMovies.map((movie) => movie.popularity),
          label: 'Popularity',
          backgroundColor: 'dodgerblue',
        },
      ],
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
