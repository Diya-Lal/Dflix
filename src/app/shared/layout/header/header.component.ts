import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
  @Input() loggedInUser!: any;
  constructor() {}

  ngOnInit(): void {}

  signOut() {
    this.logoutEvent.emit();
  }
}
