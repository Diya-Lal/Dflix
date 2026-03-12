import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MoviesService } from '../../services/movies.service';
import { NotificationService } from '../../services/notification.service';
import {
  Cast,
  Credits,
  FormattedMovie,
  MovieDetails,
  Movies,
} from 'src/app/shared/modals/movies';
import { IMAGE_URL } from '../../constants/urls-constants';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public movieId!: number;
  public movieDetails!: MovieDetails;
  public similarMovies!: FormattedMovie[];
  public similarMoviesList!: MovieDetails[];
  public credits!: Cast[];
  public imageUrl = IMAGE_URL;
  public loggedInUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.authService.loggedInUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.loggedInUser = user));
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.movieId = Number(params.get('id'));
          return forkJoin([
            this.movieService.getMovieDetailsById(this.movieId),
            this.movieService.getCreditsByMovieId(this.movieId),
            this.movieService.getSimilarMovieById(this.movieId),
          ]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(([details, credits, similar]: [MovieDetails, Credits, Movies]) => {
        this.movieDetails = details;
        this.credits = credits.cast.slice(0, 5);
        this.similarMoviesList = similar.results;
        this.similarMovies = this.movieService.formatMovieData(similar.results);
      });
  }

  public addToFavourites() {
    const added = this.movieService.addToFavourites(this.movieDetails);
    added
      ? this.notificationService.open('Added to Favourites Successfully', 1000, 'success')
      : this.notificationService.open('Movie Already Exists', 1000, 'error');
  }

  public trailerHandler(url: string) {
    window.open(url, '_blank');
  }

  onMovieClickHandler(movieIndex: number) {
    const movie = this.similarMoviesList[movieIndex];
    this.router.navigate(['/movie', movie.id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
