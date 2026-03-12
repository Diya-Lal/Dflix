import { Component, OnInit } from '@angular/core';
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
    this.favouriteMovies = this.movieService.favouritesArray;
  }

  removeFromFavourites(movie: MovieDetails) {
    this.favouriteMovies = this.movieService.removeFromFavourites(movie);
  }

  favouriteMoviesHandler(movie: MovieDetails) {
    this.router.navigate(['/movie', movie.id]);
  }

  trackByFn(index: number, movie: MovieDetails) {
    return movie.id;
  }
}
