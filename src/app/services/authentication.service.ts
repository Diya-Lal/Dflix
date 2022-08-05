import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { onSnapshot, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedInUser = authState(this.auth);
  currentUser: any;
  authUser: any = getAuth();
  signedInUser: any;
  db = getFirestore();
  favouritesRef: any;
  favMovies: any;
  unsubscribe!: any;
  constructor(private auth: Auth) {}

  getCurrentUser() {
    return this.authUser.currentUser;
  }

  signUp(email: any, password: any) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signInUser(email: any, password: any) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  // getMoviesSnapshot() {
  //   let subscription: any;
  //   this.signedInUser = this.getCurrentUser();
  //   this.unsubscribe = onSnapshot(
  //     doc(this.db, 'favourites', this.signedInUser.uid),
  //     (movie) => {
  //       if (movie.exists()) {
  //         this.favMovies = movie.data()['movies'];
  //       } else {
  //         this.favMovies = [];
  //       }
  //     }
  //   );
  // }

  // addFavourites(movie: any): Observable<any> {
  //   this.getMoviesSnapshot();
  //   this.favouritesRef = doc(this.db, 'favourites', this.signedInUser.uid);
  //   const movieDetail = {
  //     id: movie.id,
  //     poster_path: movie.poster_path,
  //     title: movie.title,
  //   };
  //   return from(
  //     setDoc(
  //       this.favouritesRef,
  //       {
  //         movies: this.favMovies
  //           ? [...this.favMovies, movieDetail]
  //           : [movieDetail],
  //       },
  //       { merge: true }
  //     )
  //   );
  // }

  // removeFavourites(movie: any): Observable<any> {
  //   this.getMoviesSnapshot();
  //   this.favouritesRef = doc(this.db, 'favourites', this.signedInUser.uid);
  //   return from(
  //     setDoc(
  //       this.favouritesRef,
  //       {
  //         movies: this.favMovies.filter(
  //           (favMovie: any) => favMovie.id !== movie.id
  //         ),
  //       },
  //       { merge: true }
  //     )
  //   );
  // }
}
