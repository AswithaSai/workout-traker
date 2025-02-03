import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutComponent } from './add-workout.component';
import { FormsModule } from '@angular/forms';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AddWorkoutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should alert if any field is missing', () => {
    spyOn(window, 'alert');
    component.userName = 'John Doe';
    component.workoutType = '';
    component.workoutMinutes = 30;
    component.addWorkout();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields!');
  });

  it('should add workout to an existing user', () => {
    const mockUsers = [
      { name: 'John Doe', workouts: [{ type: 'Running', minutes: 20 }] }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUsers));
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.userName = 'John Doe';
    component.workoutType = 'Cycling';
    component.workoutMinutes = 40;
    component.addWorkout();

    const expectedUsers = [
      {
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 20 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];
    expect(setItemSpy).toHaveBeenCalledWith('users', JSON.stringify(expectedUsers));
  });

  it('should create a new user if not found', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.userName = 'Jane Doe';
    component.workoutType = 'Yoga';
    component.workoutMinutes = 45;
    component.addWorkout();

    expect(setItemSpy).toHaveBeenCalled();
    const savedData = JSON.parse(setItemSpy.calls.mostRecent().args[1]);
    expect(savedData.length).toBe(1);
    expect(savedData[0].name).toBe('Jane Doe');
    expect(savedData[0].workouts[0].type).toBe('Yoga');
  });

  it('should emit close and workoutAdded events', () => {
    spyOn(component.close, 'emit');
    spyOn(component.workoutAdded, 'emit');

    component.userName = 'Alice';
    component.workoutType = 'Swimming';
    component.workoutMinutes = 30;
    component.addWorkout();

    expect(component.workoutAdded.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });


  it('should clear the form after adding a workout', () => {
  const mockUsers = [
    { name: 'John Doe', workouts: [{ type: 'Running', minutes: 20 }] }
  ];
  spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUsers));
  spyOn(localStorage, 'setItem');

  component.userName = 'John Doe';
  component.workoutType = 'Cycling';
  component.workoutMinutes = 40;
  component.addWorkout();

  expect(component.userName).toBe('');
  expect(component.workoutType).toBe('');
  expect(component.workoutMinutes).toBeNull();
});

it('should emit close and workoutAdded events after adding a workout', () => {
  spyOn(component.close, 'emit');
  spyOn(component.workoutAdded, 'emit');

  component.userName = 'John Doe';
  component.workoutType = 'Cycling';
  component.workoutMinutes = 40;
  component.addWorkout();

  expect(component.close.emit).toHaveBeenCalled();
  expect(component.workoutAdded.emit).toHaveBeenCalled();
});


it('should not add workout if workoutMinutes is invalid', () => {
  spyOn(window, 'alert');

  component.userName = 'John Doe';
  component.workoutType = 'Cycling';
  component.workoutMinutes = null; // Invalid value
  component.addWorkout();

  expect(window.alert).toHaveBeenCalledWith('Please fill in all fields!');
});
});
