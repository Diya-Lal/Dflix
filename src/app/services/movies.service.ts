import { Injectable, Query } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, API_KEY, IMAGE_URL } from '../constants/urls-constants';
import {
  Credits,
  FormattedMovie,
  MovieDetails,
  Movies,
} from '../shared/modals/movies';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  favouritesArray: MovieDetails[] = [];
  params = {
    api_key: `${API_KEY}`,
    language: 'en-US',
    page: 1,
  };
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  public getPopularMovies(language: string): Observable<any> {
    const popular_url = `discover/movie`;
    return this.http
      .get(`${API_BASE_URL}${popular_url}`, {
        params: {
          api_key: `${API_KEY}`,
          language: `${language}`,
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: 1,
          with_watch_monetization_types: 'flatrate',
        },
      })
      .pipe(take(10));
  }

  public getTrendingMovies(): Observable<any> {
    const trending_url = `trending/all/day`;
    return this.http.get(`${API_BASE_URL}${trending_url}`, {
      params: {
        api_key: `${API_KEY}`,
      },
    });
  }

  public getUpcomingMovies(): Observable<any> {
    const upcoming = `movie/upcoming`;
    return this.http.get(`${API_BASE_URL}${upcoming}`, {
      params: this.params,
    });
  }

  public getTopRatedMovies(): Observable<any> {
    const topRatedMovie = `movie/top_rated`;
    return this.http.get(`${API_BASE_URL}${topRatedMovie}`, {
      params: this.params,
    });
  }

  public getMovieDetailsById(movieId: number): Observable<MovieDetails> {
    const detailsUrls = `movie/${movieId}`;
    return this.http.get<MovieDetails>(`${API_BASE_URL}${detailsUrls}`, {
      params: this.params,
    });
  }

  public getSimilarMovieById(movieId: number): Observable<Movies> {
    const similarUrls = `movie/${movieId}/similar`;
    return this.http.get<Movies>(`${API_BASE_URL}${similarUrls}`, {
      params: this.params,
    });
  }

  public getCreditsByMovieId(movieId: number): Observable<Credits> {
    const creditsUrls = `movie/${movieId}/credits`;
    return this.http.get<Credits>(`${API_BASE_URL}${creditsUrls}`, {
      params: this.params,
    });
  }

  public formatMovieData(movie: MovieDetails[]): FormattedMovie[] {
    const formatedMovie: FormattedMovie[] = movie.map(
      (movie: MovieDetails) => ({
        image: `${IMAGE_URL}${movie.poster_path}`,
        thumbImage: `${IMAGE_URL}${movie.poster_path}`,
        title: movie.original_title,
      })
    );
    return formatedMovie;
  }

  addToFavourites(movie: MovieDetails) {
    const isMovieExists = this.favouritesArray.some(
      (mov: any) => mov.id === movie.id
    );
    return isMovieExists ? false : this.favouritesArray.push(movie);
  }
  removeFromFavourites(movie: MovieDetails) {
    this.favouritesArray = this.favouritesArray.filter(
      (mov: any) => mov.id !== movie.id
    );
    return this.favouritesArray;
  }

  public getMovieId(movieIndex: number, movies: any) {
    return movies.at(movieIndex);
  }

  openSnackBar(message: string, duration: number, action: string) {
    this.snackBar.open(message, '', {
      duration: duration,
      verticalPosition: 'top',
      panelClass:
        action === 'success' ? ['success-snackbar'] : ['error-snackbar'],
    });
  }
}
