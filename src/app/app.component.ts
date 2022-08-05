import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dflix';
  loggedInUser: any;
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
