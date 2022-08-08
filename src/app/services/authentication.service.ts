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
import { User } from '../shared/modals/users';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedInUser = authState(this.auth);
  currentUser: any;
  authUser: any = getAuth();
  signedInUser: any;
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
}
