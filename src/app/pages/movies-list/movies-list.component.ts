import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormattedMovie, MovieDetails, Movies } from 'src/app/shared/modals/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  public trendingMovies: FormattedMovie[] = [];
  public trendingMoviesList: MovieDetails[] = [];
  public upComingMovies: FormattedMovie[] = [];
  public upComingMoviesList: MovieDetails[] = [];
  public topRatedMovieList: MovieDetails[] = [];
  public topRatedMovies: FormattedMovie[] = [];
  private destroy$ = new Subject<void>();

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    forkJoin([
      this.moviesService.getTrendingMovies(),
      this.moviesService.getUpcomingMovies(),
      this.moviesService.getTopRatedMovies(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([trending, upcoming, topRated]: [Movies, Movies, Movies]) => {
        this.trendingMoviesList = trending.results;
        this.trendingMovies = this.moviesService.formatMovieData(trending.results);

        this.upComingMoviesList = upcoming.results;
        this.upComingMovies = this.moviesService.formatMovieData(upcoming.results);

        this.topRatedMovieList = topRated.results;
        this.topRatedMovies = this.moviesService.formatMovieData(topRated.results);
      });
  }

  onMovieClickHandler(movieIndex: number, movieType: string) {
    const listMap: Record<string, MovieDetails[]> = {
      trending: this.trendingMoviesList,
      upcoming: this.upComingMoviesList,
      topRatedMovies: this.topRatedMovieList,
    };
    const movie = listMap[movieType]?.[movieIndex];
    if (movie) {
      this.router.navigate(['/movie', movie.id]);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
