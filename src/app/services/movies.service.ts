import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, API_KEY, IMAGE_URL } from '../constants/urls-constants';
import {
  Credits,
  FormattedMovie,
  MovieDetails,
  Movies,
} from '../shared/modals/movies';

const BASE_PARAMS = {
  api_key: API_KEY,
  language: 'en-US',
  page: 1,
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  favouritesArray: MovieDetails[] = [];

  constructor(private http: HttpClient) {}

  public getPopularMovies(language: string): Observable<Movies> {
    return this.http.get<Movies>(`${API_BASE_URL}discover/movie`, {
      params: {
        api_key: API_KEY,
        language,
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: 1,
        with_watch_monetization_types: 'flatrate',
      },
    });
  }

  public getTrendingMovies(): Observable<Movies> {
    return this.http.get<Movies>(`${API_BASE_URL}trending/all/day`, {
      params: { api_key: API_KEY },
    });
  }

  public getUpcomingMovies(): Observable<Movies> {
    return this.http.get<Movies>(`${API_BASE_URL}movie/upcoming`, {
      params: BASE_PARAMS,
    });
  }

  public getTopRatedMovies(): Observable<Movies> {
    return this.http.get<Movies>(`${API_BASE_URL}movie/top_rated`, {
      params: BASE_PARAMS,
    });
  }

  public getMovieDetailsById(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${API_BASE_URL}movie/${movieId}`, {
      params: BASE_PARAMS,
    });
  }

  public getSimilarMovieById(movieId: number): Observable<Movies> {
    return this.http.get<Movies>(`${API_BASE_URL}movie/${movieId}/similar`, {
      params: BASE_PARAMS,
    });
  }

  public getCreditsByMovieId(movieId: number): Observable<Credits> {
    return this.http.get<Credits>(`${API_BASE_URL}movie/${movieId}/credits`, {
      params: BASE_PARAMS,
    });
  }

  public formatMovieData(movies: MovieDetails[]): FormattedMovie[] {
    return movies.map((movie) => ({
      image: `${IMAGE_URL}${movie.poster_path}`,
      thumbImage: `${IMAGE_URL}${movie.poster_path}`,
      title: movie.original_title,
    }));
  }

  addToFavourites(movie: MovieDetails): boolean {
    const exists = this.favouritesArray.some((m) => m.id === movie.id);
    if (!exists) {
      this.favouritesArray.push(movie);
    }
    return !exists;
  }

  removeFromFavourites(movie: MovieDetails): MovieDetails[] {
    this.favouritesArray = this.favouritesArray.filter((m) => m.id !== movie.id);
    return this.favouritesArray;
  }
}
