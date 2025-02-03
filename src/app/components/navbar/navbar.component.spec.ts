import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openModal event when "Add Workout" button is clicked', () => {
    spyOn(component.openModal, 'emit');
    
    const button = fixture.debugElement.query(By.css('button:nth-child(1)'));
    button.nativeElement.click();
    
    expect(component.openModal.emit).toHaveBeenCalled();
  });

  it('should emit toggleCharts event when "View Charts" button is clicked', () => {
    spyOn(component.toggleCharts, 'emit');

    const button = fixture.debugElement.query(By.css('button:nth-child(2)'));
    button.nativeElement.click();

    expect(component.toggleCharts.emit).toHaveBeenCalled();
  });

  it('should display the correct toggle button text', () => {
    component.toggleButtonText = 'View List';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button:nth-child(2)')).nativeElement;
    expect(button.textContent.trim()).toBe('View List');
  });

  it('should log "View Charts Clicked" when toggleCharts is clicked', () => {
    spyOn(console, 'log');

    component.onToggleCharts();

    expect(console.log).toHaveBeenCalledWith('View Charts Clicked');
  });

  it('should log "Add Workout Clicked" when openModal is clicked', () => {
    spyOn(console, 'log');

    component.onOpenModal();

    expect(console.log).toHaveBeenCalledWith('Add Workout Clicked');
  });

  it('should update toggleButtonText dynamically', () => {
  const fixture = TestBed.createComponent(NavbarComponent);
  const app = fixture.componentInstance;

  app.toggleButtonText = 'View List';
  fixture.detectChanges();

  const button = fixture.debugElement.query(By.css('button:nth-child(2)')).nativeElement;
  expect(button.textContent.trim()).toBe('View List');
});
});
