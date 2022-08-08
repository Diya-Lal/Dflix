import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthenticationService } from '../..//services/authentication.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
      ]),
    },
    { validators: passwordsMatchValidator() }
  );

  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  signUpUser() {
    if (!this.signUpForm.valid) {
      return;
    }
    this.authService.signUp(this.email?.value, this.password?.value).subscribe(
      (SignUpSuccess) => {
        this.movieService.openSnackBar(
          'Successfully Signed Up',
          1000,
          'success'
        );
        this.formDirective.resetForm();
        this.router.navigate(['/']);
      },
      (SignUpFailed) => {
        this.movieService.openSnackBar(SignUpFailed, 5000, 'error');
        this.formDirective.resetForm();
      }
    );
  }
}
