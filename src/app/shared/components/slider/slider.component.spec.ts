import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent],
      imports: [NgImageSliderModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the title input in the template', () => {
    component.title = 'Trending';
    fixture.detectChanges();
    const heading: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(heading.textContent).toContain('Trending');
  });

  it('should emit the movie index when onClickEventHandler is called', () => {
    spyOn(component.movieClicked, 'emit');
    component.onClickEventHandler(3);
    expect(component.movieClicked.emit).toHaveBeenCalledWith(3);
  });

  it('should emit index 0 correctly', () => {
    spyOn(component.movieClicked, 'emit');
    component.onClickEventHandler(0);
    expect(component.movieClicked.emit).toHaveBeenCalledWith(0);
  });

  it('should update the rendered title when title input changes', () => {
    component.title = 'Top Rated';
    fixture.detectChanges();
    const heading: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(heading.textContent).toContain('Top Rated');
  });
});
