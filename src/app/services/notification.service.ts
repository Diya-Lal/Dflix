import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, duration: number, action: 'success' | 'error') {
    this.snackBar.open(message, '', {
      duration,
      verticalPosition: 'top',
      panelClass: action === 'success' ? ['success-snackbar'] : ['error-snackbar'],
    });
  }
}
