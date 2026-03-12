import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  loggedInUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.loggedInUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.loggedInUser = user));
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
