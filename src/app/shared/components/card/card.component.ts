import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMAGE_URL } from 'src/app/constants/urls-constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Output() cardClickedEvent: EventEmitter<string> = new EventEmitter();
  imageUrl: string = IMAGE_URL;
  constructor() {}

  onClick() {
    this.cardClickedEvent.emit('');
  }
}
