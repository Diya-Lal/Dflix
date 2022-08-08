export interface Movies {
  page: number;
  results: MovieDetails[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  belongs_to_collection?: any;
  budget?: number;
  genres: Genre[];
  homepage: string;
  imdb_id?: string;
  production_companies?: [];
  production_countries?: [];
  spoken_languages?: [];
  status?: string;
  tagline?: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: string;
}
export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
  credit_id: number;
  department: number;
  job: string;
}

export interface FormattedMovie {
  image: string;
  thumbImage: string;
  title: string;
}

export const LANGUAGES = [
  { id: 'en-US', value: 'English' },
  { id: 'de-DE', value: 'German' },
  { id: 'fr-FR', value: 'French' },
];
