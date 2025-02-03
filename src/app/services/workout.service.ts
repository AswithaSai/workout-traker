// workout.service.ts
import { Injectable } from '@angular/core';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
  totalMinutes: number;
  workoutCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts: User[] = [];

  constructor() {}

  // Method to add a workout for a user
  addWorkout(userName: string, workoutType: string, workoutMinutes: number): void {
  if (workoutMinutes <= 0) {
    return; // Ignore invalid input
  }

  let user = this.workouts.find(u => u.name === userName);

  if (!user) {
    user = {
      name: userName,
      workouts: [],
      totalMinutes: 0,
      workoutCount: 0,
    };
    this.workouts.push(user);
  }

  user.workouts.push({
    type: workoutType,
    minutes: workoutMinutes,
  });

  user.totalMinutes += workoutMinutes;
  user.workoutCount += 1;
}


  // Method to get all workouts
  getWorkouts(): User[] {
    return this.workouts;
  }
}
