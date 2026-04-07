import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
  @Input() loggedInUser: User | any;
  constructor() {}

  signOut() {
    this.logoutEvent.emit();
  }
}
