import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IMAGE_URL } from 'src/app/constants/urls-constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() image!: string;
  @Input() title!: string;
  @Output() onCardClickedEvent: EventEmitter<any> = new EventEmitter();
  imageUrl = IMAGE_URL;
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.onCardClickedEvent.emit('');
  }
}
