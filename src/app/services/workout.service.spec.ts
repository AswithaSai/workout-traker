// workout.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addWorkout', () => {
    it('should add a workout to an existing user and update totalMinutes and workoutCount', () => {
      service.addWorkout('John', 'Running', 30);  // First workout
      service.addWorkout('John', 'Running', 15);  // Second workout

      const workouts = service.getWorkouts();
      const john = workouts.find(user => user.name === 'John');

      expect(john).toBeTruthy(); 
      expect(john?.workouts.length).toBe(2); 
      expect(john?.workouts[0].minutes).toBe(30); 
      expect(john?.workouts[1].minutes).toBe(15); 
      expect(john?.totalMinutes).toBe(45); 
      expect(john?.workoutCount).toBe(2);
    });

    it('should create a new user if the user does not exist', () => {
      service.addWorkout('Alice', 'Cycling', 40);

      const workouts = service.getWorkouts();
      const alice = workouts.find(user => user.name === 'Alice');

      expect(alice).toBeTruthy();
      expect(alice?.workouts.length).toBe(1);
      expect(alice?.workouts[0].minutes).toBe(40);
      expect(alice?.totalMinutes).toBe(40);
      expect(alice?.workoutCount).toBe(1);
    });
  });

  describe('getWorkouts', () => {
    it('should return the list of workouts', () => {
      service.addWorkout('John', 'Running', 30);
      service.addWorkout('Alice', 'Cycling', 40);

      const workouts = service.getWorkouts();
      
      expect(workouts.length).toBe(2);
      expect(workouts[0].name).toBe('John');
      expect(workouts[1].name).toBe('Alice');
    });
  });

  it('should not add workout if workoutMinutes is invalid', () => {
  service.addWorkout('John', 'Running', -10); // Invalid minutes
  const workouts = service.getWorkouts();
  const john = workouts.find(user => user.name === 'John');

  expect(john).toBeUndefined(); // No user should be added
});

it('should return an empty array if no workouts exist', () => {
  const workouts = service.getWorkouts();
  expect(workouts).toEqual([]);
});
});
