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

  addWorkout(userName: string, workoutType: string, workoutMinutes: number) {
    const existingUser = this.workouts.find((user) => user.name === userName);

    if (existingUser) {
      const workoutEntry = existingUser.workouts.find(
        (w) => w.type === workoutType
      );
      if (workoutEntry) {
        workoutEntry.minutes += workoutMinutes;
      } else {
        existingUser.workouts.push({ type: workoutType, minutes: workoutMinutes });
      }
      existingUser.totalMinutes += workoutMinutes;
      existingUser.workoutCount++;
    } else {
      this.workouts.push({
        name: userName,
        workouts: [{ type: workoutType, minutes: workoutMinutes }],
        totalMinutes: workoutMinutes,
        workoutCount: 1,
      });
    }
  }

  getWorkouts(): User[] {
    return this.workouts;
  }
}
