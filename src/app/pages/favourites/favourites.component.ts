import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { getAuth } from 'firebase/auth';
// import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
// import { AuthenticationService } from 'src/app/services/authentication.service';
// import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  // favouriteMovies!: any;
  // currentUser: any;
  // unsubscribe: any;
  // isLoading: boolean = false;
  // authUser = getAuth();
  // db = getFirestore();
  // constructor(
  //   private authService: AuthenticationService,
  //   private movieService: MoviesService,
  //   private router: Router
  // ) {}
  // ngOnInit(): void {
  //   this.currentUser = this.authUser.currentUser;
  //   this.isLoading = true;
  //   this.favMovieSubscription();
  // }
  // favMovieSubscription() {
  //   this.unsubscribe = onSnapshot(
  //     doc(this.db, 'favourites', this.currentUser.uid),
  //     (movie) => {
  //       if (movie.exists()) {
  //         this.favouriteMovies = movie.data()['movies'];
  //       } else {
  //         this.favouriteMovies = [];
  //       }
  //       this.isLoading = false;
  //     }
  //   );
  // }
  // favouriteMoviesHandler(movie: any) {
  //   this.router.navigate(['/movie', movie.id]);
  // }
  // public removeFromFavourites(movie: any) {
  //   this.authService
  //     .removeFavourites(movie)
  //     .subscribe((RemoveFromFavouritesSuccess: any) => {
  //       this.movieService.openSnackBar(
  //         'Removed from Favourites Successfully',
  //         1000,
  //         'success'
  //       );
  //       this.favMovieSubscription();
  //     });
  // }
  // public ngOnDestroy() {
  //   this.unsubscribe();
  // }
}
