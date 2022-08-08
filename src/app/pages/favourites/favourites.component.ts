import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetails } from 'src/app/shared/modals/movies';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favouriteMovies!: MovieDetails[];
  constructor(private movieService: MoviesService, private router: Router) {}
  ngOnInit() {
    this.getFavouriteMovies();
  }

  getFavouriteMovies() {
    this.favouriteMovies = this.movieService.favouritesArray;
  }
  removeFromFavourites(movie: any) {
    this.favouriteMovies = this.movieService.removeFromFavourites(movie);
  }

  favouriteMoviesHandler(movie: any) {
    this.router.navigate(['/movie', movie.id]);
  }

  trackByFn(index: number, item: MovieDetails) {
    return item.id;
  }
}
