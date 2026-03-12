import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signIn = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;

  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

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
      .signInUser(this.email?.value!, this.password?.value!)
      .subscribe({
        next: () => {
          this.notificationService.open('Successfully Signed In', 1000, 'success');
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
