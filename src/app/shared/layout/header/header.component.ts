import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
  @Input() loggedInUser: User | any;
  constructor() {}

  ngOnInit(): void {}

  signOut() {
    this.logoutEvent.emit();
  }
}
