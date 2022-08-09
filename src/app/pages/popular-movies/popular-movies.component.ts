import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map, pipe, take } from 'rxjs';
import { LANGUAGES, MovieDetails, Movies } from 'src/app/shared/modals/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss'],
})
export class PopularMoviesComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [];
  public popularMovies!: Movies;
  public chartLabels!: string[];
  public chartData: any;
  public charColours = {
    backgroundColor: 'white',
  };
  public languages = LANGUAGES;
  public movieLanguage = this.languages[0].id;
  public barChartData!: ChartConfiguration<'bar'>['data'];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPopularMovies('en-US');
  }

  public getPopularMovies(language: string) {
    this.moviesService
      .getPopularMovies(language)
      .subscribe((GetPopularMoviesSuccess: Movies) => {
        this.popularMovies = GetPopularMoviesSuccess;
        this.formatDataForChart(this.popularMovies.results);
      });
  }

  public formatDataForChart(popularMovies: MovieDetails[]) {
    this.chartData = [];
    this.chartLabels = popularMovies.map(
      (movie: MovieDetails) => movie.original_title
    );
    const data = {
      data: popularMovies.map((movie: MovieDetails) => movie.popularity),
      label: 'Popularity',
      backgroundColor: 'dodgerblue',
    };
    this.chartData.push(data);
    this.barChartData = {
      labels: this.chartLabels,
      datasets: this.chartData,
    };
  }
}
