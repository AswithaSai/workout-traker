import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-workout-list',
  standalone: true,  // Marking as standalone
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  imports: [FormsModule, CommonModule],  // Add CommonModule here
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];
  searchQuery: string = '';
  selectedWorkoutType: string = 'All';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
  }

  getWorkoutTypes(user: any): string {
    return user.workouts?.map((w: { type: string }) => w.type).join(', ') || ''; // Default to empty string
  }

  getFilteredWorkouts() {
    return this.workouts
      .filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .filter((user) =>
        this.selectedWorkoutType === 'All' ||
        user.workouts?.some((w: { type: string }) => w.type === this.selectedWorkoutType)
      );
  }
}
