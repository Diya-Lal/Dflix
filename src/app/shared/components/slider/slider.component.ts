import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() data: any; // 'Any' type given inorder to display any data type in the slider.
  @Input() title!: string;
  @Output() movieClicked: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClickEventHandler(movieIndex: number) {
    this.movieClicked.emit(movieIndex);
  }
}
