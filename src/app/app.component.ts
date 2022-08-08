import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './shared/modals/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'dflix';
  loggedInUser: User | any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.loggedInUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/']));
  }
}
