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
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const redirectUnauthorizedUsersToLogin = () =>
  redirectUnauthorizedTo(['signin']);
const redirectLoggedInUsersToLogout = () => redirectLoggedInTo(['']);

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
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
