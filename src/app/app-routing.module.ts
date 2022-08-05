import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { PopularMoviesComponent } from './pages/popular-movies/popular-movies.component';
import { SignupComponent } from './pages/signup/signup.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { SigninComponent } from './pages/signin/signin.component';

const redirectUnauthorizedUsersToLogin = () => redirectUnauthorizedTo(['/']);
const redirectLoggedInUsersToLogout = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'popular', component: PopularMoviesComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectLoggedInUsersToLogout),
  },
  {
    path: 'signin',
    component: SigninComponent,
    ...canActivate(redirectLoggedInUsersToLogout),
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    ...canActivate(redirectUnauthorizedUsersToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
