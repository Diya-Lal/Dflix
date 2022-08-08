import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit on click', () => {
    spyOn(component.movieClicked, 'emit');
    component.onClickEventHandler(1);
    expect(component.movieClicked.emit).toHaveBeenCalled();
    expect(component.movieClicked.emit).toHaveBeenCalledWith(1);
  });
});
