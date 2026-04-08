import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from './header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the SignIn button when loggedInUser is null', () => {
    component.loggedInUser = null;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const signInButton = buttons.find(b => b.nativeElement.textContent.includes('SignIn'));
    expect(signInButton).toBeTruthy();
  });

  it('should hide the My Favourites link when loggedInUser is null', () => {
    component.loggedInUser = null;
    fixture.detectChanges();
    const allMenuItems = fixture.debugElement.queryAll(By.css('span[id="menu-list"]'));
    const favLink = allMenuItems.find((el) =>
      el.nativeElement.textContent.includes('My Favourites')
    );
    expect(favLink).toBeFalsy();
  });

  it('should show the My Favourites link when loggedInUser is set', () => {
    component.loggedInUser = { email: 'test@test.com' } as any;
    fixture.detectChanges();
    const allMenuItems = fixture.debugElement.queryAll(By.css('span[id="menu-list"]'));
    const favLink = allMenuItems.find((el) =>
      el.nativeElement.textContent.includes('My Favourites')
    );
    expect(favLink).toBeTruthy();
  });

  it('should show the user account icon when loggedInUser is set', () => {
    component.loggedInUser = { email: 'test@test.com' } as any;
    fixture.detectChanges();
    const accountIcon = fixture.debugElement.query(By.css('mat-icon'));
    expect(accountIcon).toBeTruthy();
  });

  it('should emit logoutEvent when signOut is called', () => {
    spyOn(component.logoutEvent, 'emit');
    component.signOut();
    expect(component.logoutEvent.emit).toHaveBeenCalled();
  });

  it('should not emit logoutEvent without an explicit signOut call', () => {
    spyOn(component.logoutEvent, 'emit');
    expect(component.logoutEvent.emit).not.toHaveBeenCalled();
  });
});
