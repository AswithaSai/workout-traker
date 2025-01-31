import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css'],
  standalone: true,  // Mark the component as standalone
  imports: [FormsModule],  // Import FormsModule here for ngModel to work
})
export class AddWorkoutComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      this.workoutService.addWorkout(this.userName, this.workoutType, this.workoutMinutes);
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    }
  }
}

