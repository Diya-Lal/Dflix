import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { IMAGE_URL } from 'src/app/constants/urls-constants';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.image = '/test-poster.jpg';
    component.title = 'Test Movie';
    fixture.detectChanges();
  });

  it('should render the title in the template', () => {
    const titleEl: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(titleEl.textContent).toContain('Test Movie');
  });

  it('should build the image src from IMAGE_URL and the image input', () => {
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain(IMAGE_URL);
    expect(img.src).toContain('/test-poster.jpg');
  });

  it('should emit an empty string from onCardClickedEvent when onClick is called', () => {
    spyOn(component.onCardClickedEvent, 'emit');
    component.onClick();
    expect(component.onCardClickedEvent.emit).toHaveBeenCalledWith('');
  });

  it('should emit onCardClickedEvent when the card container is clicked', () => {
    spyOn(component.onCardClickedEvent, 'emit');
    const container: HTMLElement = fixture.debugElement.query(By.css('.card-container')).nativeElement;
    container.click();
    expect(component.onCardClickedEvent.emit).toHaveBeenCalled();
  });

  it('should update the rendered title when the title input changes', () => {
    component.title = 'Updated Title';
    fixture.detectChanges();
    const titleEl: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(titleEl.textContent).toContain('Updated Title');
  });
});
