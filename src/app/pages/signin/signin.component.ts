import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signIn = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.signIn.get('email');
  }

  get password() {
    return this.signIn.get('password');
  }

  signInUser() {
    if (!this.signIn.valid) {
      return;
    }
    this.authService
      .signInUser(this.email?.value, this.password?.value)
      .subscribe(
        (SignInSuccess) => {
          this.movieService.openSnackBar(
            'Successfully Signed In',
            1000,
            'success'
          );
          this.router.navigate(['/']);
          this.formDirective.resetForm();
        },
        (SignInFailed) => {
          this.movieService.openSnackBar(SignInFailed, 5000, 'error');
          this.formDirective.resetForm();
        }
      );
  }
}
