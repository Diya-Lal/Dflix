import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormattedMovie,
  MovieDetails,
  Movies,
} from 'src/app/shared/modals/movies';
import { IMAGE_URL } from '../../constants/urls-constants';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  public trendingMovies: FormattedMovie[] = [];
  public trendingMoviesList: MovieDetails[] = [];
  public upComingMovies: FormattedMovie[] = [];
  public upComingMoviesList: MovieDetails[] = [];
  public topRatedMovieList: MovieDetails[] = [];
  public topRatedMovies: FormattedMovie[] = [];
  public movieId!: number;
  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getUpcoming();
    this.getTopRatedMovies();
  }

  public getTrendingMovies() {
    this.moviesService
      .getTrendingMovies()
      .subscribe((GetTrendingMoviesSuccess: Movies) => {
        this.trendingMoviesList = GetTrendingMoviesSuccess.results;
        this.trendingMovies = this.moviesService.formatMovieData(
          GetTrendingMoviesSuccess.results
        );
      });
  }

  public getUpcoming() {
    this.moviesService
      .getUpcomingMovies()
      .subscribe((GetUpcomingMoviesSuccess: Movies) => {
        this.upComingMoviesList = GetUpcomingMoviesSuccess.results;
        this.upComingMovies = this.moviesService.formatMovieData(
          GetUpcomingMoviesSuccess.results
        );
      });
  }

  public getTopRatedMovies() {
    this.moviesService
      .getTopRatedMovies()
      .subscribe((GetTopRatedMovieSuccess) => {
        this.topRatedMovieList = GetTopRatedMovieSuccess.results;
        this.topRatedMovies = this.moviesService.formatMovieData(
          GetTopRatedMovieSuccess.results
        );
      });
  }

  onMovieClickHandler(movieIndex: number, movieType: string) {
    switch (movieType) {
      case 'trending':
        this.movieId = this.getMovieId(movieIndex, this.trendingMoviesList).id;
        break;
      case 'upcoming':
        this.movieId = this.getMovieId(movieIndex, this.upComingMoviesList).id;
        break;
      case 'topRatedMovies':
        this.movieId = this.getMovieId(movieIndex, this.topRatedMovieList).id;
        break;
    }
    this.router.navigate(['/movie', this.movieId]);
  }

  public getMovieId(movieIndex: number, movies: any) {
    return movies.at(movieIndex);
  }
}
