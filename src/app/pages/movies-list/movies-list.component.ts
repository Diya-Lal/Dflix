import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMAGE_URL } from '../../constants/urls-constants';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  public trendingMovies: any = [];
  public trendingMoviesList: any = [];
  public upComingMovies: any = [];
  public upComingMoviesList: any = [];
  public latestTV: any = [];
  public movieId!: number;
  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getUpcoming();
  }

  public getTrendingMovies() {
    this.moviesService
      .getTrendingMovies()
      .subscribe((GetTrendingMoviesSuccess: any) => {
        this.trendingMoviesList = GetTrendingMoviesSuccess.results;
        this.trendingMovies = this.moviesService.formatMovieData(
          GetTrendingMoviesSuccess.results
        );
      });
  }

  public getUpcoming() {
    this.moviesService
      .getUpcomingMovies()
      .subscribe((GetUpcomingMoviesSuccess: any) => {
        this.upComingMoviesList = GetUpcomingMoviesSuccess.results;
        this.upComingMovies = this.moviesService.formatMovieData(
          GetUpcomingMoviesSuccess.results
        );
      });
  }

  onMovieClickHandler(event: any, movieType: string) {
    switch (movieType) {
      case 'trending':
        this.movieId = this.getMovieId(event, this.trendingMoviesList).id;
        break;
      case 'upcoming':
        this.movieId = this.getMovieId(event, this.upComingMoviesList).id;
    }
    console.log(this.movieId);
    this.router.navigate(['/movie', this.movieId]);
  }

  public getMovieId(movieIndex: number, movies: any) {
    return movies.at(movieIndex);
  }
}
