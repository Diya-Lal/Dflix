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

  public getLatestTVShows(): Observable<any> {
    const latestTV = `tv/latest`;
    return this.http.get(`${API_BASE_URL}${latestTV}`, {
      params: {
        api_key: `${API_KEY}`,
        language: 'en-US',
      },
    });
  }

  public getUpcomingMovies(): Observable<any> {
    const upcoming = `movie/upcoming`;
    return this.http.get(`${API_BASE_URL}${upcoming}`, {
      params: {
        api_key: `${API_KEY}`,
        language: 'en-US',
        page: 1,
      },
    });
  }

  public getMovieDetailsById(movieId: number): Observable<MovieDetails> {
    const detailsUrls = `movie/${movieId}`;
    return this.http.get<MovieDetails>(`${API_BASE_URL}${detailsUrls}`, {
      params: {
        api_key: `${API_KEY}`,
        language: 'en-US',
        page: 1,
      },
    });
  }

  public getSimilarMovieById(movieId: number): Observable<Movies> {
    const similarUrls = `movie/${movieId}/similar`;
    return this.http.get<Movies>(`${API_BASE_URL}${similarUrls}`, {
      params: {
        api_key: `${API_KEY}`,
        language: 'en-US',
        page: 1,
      },
    });
  }

  public getCreditsByMovieId(movieId: number): Observable<Credits> {
    const creditsUrls = `movie/${movieId}/credits`;
    return this.http.get<Credits>(`${API_BASE_URL}${creditsUrls}`, {
      params: {
        api_key: `${API_KEY}`,
        language: 'en-US',
        page: 1,
      },
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

  openSnackBar(message: string, duration: number, action: string) {
    this.snackBar.open(message, '', {
      duration: duration,
      verticalPosition: 'top',
      panelClass:
        action === 'success' ? ['success-snackbar'] : ['error-snackbar'],
    });
  }
}
