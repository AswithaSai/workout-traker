import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent, CommonModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load workouts from localStorage', () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [{ type: 'Swimming', minutes: 60 }]
      }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUsers));

    component.loadWorkouts();

    expect(component.allWorkouts.length).toBe(3);
    expect(component.allWorkouts).toEqual([
      { name: 'John Doe', type: 'Running', minutes: 30 },
      { name: 'John Doe', type: 'Cycling', minutes: 45 },
      { name: 'Jane Smith', type: 'Swimming', minutes: 60 }
    ]);
  });

  it('should filter workouts by search query', () => {
    component.allWorkouts = [
      { name: 'John Doe', type: 'Running', minutes: 30 },
      { name: 'Jane Smith', type: 'Swimming', minutes: 60 }
    ];
    component.searchQuery = 'Jane';
    component.applyFilters();

    expect(component.displayedWorkouts.length).toBe(1);
    expect(component.displayedWorkouts).toEqual([
      { name: 'Jane Smith', type: 'Swimming', minutes: 60 }
    ]);
  });

  it('should filter workouts by type', () => {
    component.allWorkouts = [
      { name: 'John Doe', type: 'Running', minutes: 30 },
      { name: 'Jane Smith', type: 'Swimming', minutes: 60 }
    ];
    component.selectedWorkoutType = 'Running';
    component.applyFilters();

    expect(component.displayedWorkouts.length).toBe(1);
    expect(component.displayedWorkouts).toEqual([
      { name: 'John Doe', type: 'Running', minutes: 30 }
    ]);
  });

  it('should apply pagination correctly', () => {
    component.allWorkouts = Array.from({ length: 12 }, (_, i) => ({
      name: `User ${i + 1}`,
      type: 'Running',
      minutes: 30
    }));
    component.itemsPerPage = 5;
    component.currentPage = 1;
    component.applyFilters();

    expect(component.displayedWorkouts.length).toBe(5);
  });

  it('should change page correctly', () => {
    component.allWorkouts = Array.from({ length: 12 }, (_, i) => ({
      name: `User ${i + 1}`,
      type: 'Running',
      minutes: 30
    }));
    component.itemsPerPage = 5;
    component.currentPage = 1;
    component.applyFilters();

    component.changePage(1); // Go to next page
    expect(component.currentPage).toBe(2);
    expect(component.displayedWorkouts.length).toBe(5);

    component.changePage(1); // Go to next page
    expect(component.currentPage).toBe(3);
    expect(component.displayedWorkouts.length).toBe(2);

    component.changePage(-1); // Go back to page 2
    expect(component.currentPage).toBe(2);
    expect(component.displayedWorkouts.length).toBe(5);
  });

  it('should handle empty localStorage data', () => {
  spyOn(localStorage, 'getItem').and.returnValue(null);
  component.loadWorkouts();

  expect(component.allWorkouts).toEqual([]);
  expect(component.displayedWorkouts).toEqual([]);
});

it('should not change page if out of bounds', () => {
  component.allWorkouts = Array.from({ length: 12 }, (_, i) => ({
    name: `User ${i + 1}`,
    type: 'Running',
    minutes: 30
  }));
  component.itemsPerPage = 5;
  component.currentPage = 1;

  
  component.changePage(-1);
  expect(component.currentPage).toBe(1); 
  component.changePage(2); 
  component.changePage(1); 
  expect(component.currentPage).toBe(3); 
});
});

