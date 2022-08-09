import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { first, pipe, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {
  Cast,
  Credits,
  FormattedMovie,
  MovieDetails,
  Movies,
} from 'src/app/shared/modals/movies';
import { IMAGE_URL } from '../../constants/urls-constants';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public movieId: any;
  public movieDetails!: MovieDetails;
  public similarMovies!: FormattedMovie[];
  public similarMoviesList!: any[];
  public credits!: Cast[];
  public imageUrl = IMAGE_URL;
  public loggedInUser: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.loggedInUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
  }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  public getMovieDetails() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: Params) => {
          this.movieId = params['get']('id');
          return this.movieService.getMovieDetailsById(this.movieId);
        })
      )
      .subscribe((GetMovieDetailsSuccess: MovieDetails) => {
        this.movieDetails = GetMovieDetailsSuccess;
        this.getMvoieCredits(this.movieId);
      });
  }

  public getMvoieCredits(movieId: number) {
    this.movieService
      .getCreditsByMovieId(movieId)
      .subscribe((GetCreditsSuccess: Credits) => {
        this.credits = GetCreditsSuccess.cast.slice(0, 5);
        this.getSimilarMovies(this.movieId);
      });
  }

  public getSimilarMovies(movieId: number) {
    this.movieService
      .getSimilarMovieById(movieId)
      .subscribe((GetSimilarMoviesSuccess: Movies) => {
        this.similarMoviesList = GetSimilarMoviesSuccess.results;
        this.similarMovies = this.movieService.formatMovieData(
          GetSimilarMoviesSuccess.results
        );
      });
  }

  public trailerHandlrer(url: string) {
    window.open(url, '_blank');
  }

  public addToFavourites() {
    const movieAdded = this.movieService.addToFavourites(this.movieDetails);
    movieAdded
      ? this.movieService.openSnackBar(
          'Added to Favourites Successfully',
          1000,
          'success'
        )
      : this.movieService.openSnackBar('Movie Already Exists', 1000, 'error');
  }

  onMovieClickHandler(event: any) {
    const movieId = this.movieService.getMovieId(
      event,
      this.similarMoviesList
    ).id;
    this.router.navigate(['/movie', movieId]);
  }
}
