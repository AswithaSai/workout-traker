import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, WorkoutListComponent, WorkoutChartComponent, AddWorkoutComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workout-tracker';
  showCharts = false;
  showModal = false;

  @ViewChild(WorkoutListComponent) workoutListComponent!: WorkoutListComponent;

  constructor() {
    this.initializeData();
  }

 
initializeData() {
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
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
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
}

get toggleButtonText() {
    return this.showCharts ? 'View List' : 'View Charts';
  }
  
  toggleCharts() {
    this.showCharts = !this.showCharts;
    console.log('Toggled Charts:', this.showCharts);
  }

  openModal() {
    this.showModal = true;
    console.log('Opening Modal:', this.showModal);
  }

  closeModal() {
    this.showModal = false;
    console.log('Closing Modal:', this.showModal);
  }
  updateWorkouts() {
    if (this.workoutListComponent) {
      this.workoutListComponent.loadWorkouts();
    }
  }

}
