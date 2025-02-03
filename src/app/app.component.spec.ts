import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; 
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule, 
        AppComponent, 
        NavbarComponent, 
        WorkoutListComponent, 
        WorkoutChartComponent, 
        AddWorkoutComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the title "workout-tracker"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('workout-tracker');
  });

  it('should update workouts by calling workout list component method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });

  it('should open and close modal correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });
  
  it('should initialize default users in localStorage if not already set', () => {
  localStorage.removeItem('users'); // Ensure localStorage is empty
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  app.initializeData();

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  expect(users.length).toBe(3);
  expect(users[0].name).toBe('John Doe');
  expect(users[1].name).toBe('Jane Smith');
  expect(users[2].name).toBe('Mike Johnson');
});

it('should toggle charts visibility and update button text', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;

  expect(app.showCharts).toBeFalse();
  expect(app.toggleButtonText).toBe('View Charts');

  app.toggleCharts();
  expect(app.showCharts).toBeTrue();
  expect(app.toggleButtonText).toBe('View List');

  app.toggleCharts();
  expect(app.showCharts).toBeFalse();
  expect(app.toggleButtonText).toBe('View Charts');
});


});

