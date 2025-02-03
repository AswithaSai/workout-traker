import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
  @Output() close = new EventEmitter<void>();
  @Output() workoutAdded = new EventEmitter<void>();

  userName = '';
  workoutType = '';
  workoutMinutes: number | null = null;
  workoutTypes = ['Running', 'Cycling', 'Yoga', 'Swimming', 'Weight Training'];

  addWorkout() {
    if (!this.userName || !this.workoutType || !this.workoutMinutes) {
      alert("Please fill in all fields!");
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

   
    let existingUser = users.find((user: any) => user.name.toLowerCase() === this.userName.toLowerCase());

    if (existingUser) {
     
      existingUser.workouts.push({
        type: this.workoutType,
        minutes: this.workoutMinutes
      });
    } else {
      
      const newUser = {
        id: new Date().getTime(),
        name: this.userName,
        workouts: [
          {
            type: this.workoutType,
            minutes: this.workoutMinutes
          }
        ]
      };
      users.push(newUser);
    }

   
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('workouts'); 

   
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = null;

    this.workoutAdded.emit();
    this.close.emit();
  }
}
