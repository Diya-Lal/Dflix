import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { first, pipe } from 'rxjs';
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
export class MovieDetailsComponent implements OnInit, OnDestroy {
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
    this.activatedRoute.paramMap.subscribe((params) => {
      this.movieId = params.get('id');
      this.getMovieDetails(this.movieId);
      this.getSimilarMovies(this.movieId);
      this.getMvoieCredits(this.movieId);
    });
  }

  public getMovieDetails(movieId: number) {
    this.movieService
      .getMovieDetailsById(movieId)
      .subscribe((GetMovieDetailsSuccess: MovieDetails) => {
        this.movieDetails = GetMovieDetailsSuccess;
      });
  }

  public getMvoieCredits(movieId: number) {
    this.movieService
      .getCreditsByMovieId(movieId)
      .subscribe((GetCreditsSuccess: Credits) => {
        this.credits = GetCreditsSuccess.cast.slice(0, 5);
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
    // this.authService
    //   .addFavourites(this.movieDetails)
    //   .subscribe((AddToFavouritesSuccess) => {
    //     this.movieService.openSnackBar(
    //       'Added to Favourites Successfully',
    //       1000,
    //       'success'
    //     );
    //   });
  }

  onMovieClickHandler(event: any) {
    const movieId = this.getMovieId(event, this.similarMoviesList).id;
    this.router.navigate(['/movie', movieId]);
  }

  public getMovieId(movieIndex: number, movies: any) {
    return movies.at(movieIndex);
  }

  public ngOnDestroy() {
    this.authService.unsubscribe();
  }
}
