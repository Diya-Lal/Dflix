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
  @Input() data: any;
  @Input() title!: string;
  @Output() movieClicked: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClickEventHandler(event: any) {
    this.movieClicked.emit(event);
  }
}
