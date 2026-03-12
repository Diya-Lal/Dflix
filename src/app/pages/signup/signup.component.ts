import { Component, ViewChild } from '@angular/core';
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
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordsDontMatch: true }
      : null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;

  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

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
    this.authService.signUp(this.email?.value!, this.password?.value!).subscribe({
      next: () => {
        this.notificationService.open('Successfully Signed Up', 1000, 'success');
        this.formDirective.resetForm();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.notificationService.open(err.message, 5000, 'error');
        this.formDirective.resetForm();
      },
    });
  }
}
