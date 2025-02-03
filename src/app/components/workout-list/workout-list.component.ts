import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  allWorkouts: { name: string; type: string; minutes: number }[] = [];
  displayedWorkouts: { name: string; type: string; minutes: number }[] = [];
  searchQuery = '';
  selectedWorkoutType = '';
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    
    this.allWorkouts = users.flatMap(user =>
      user.workouts.map(workout => ({
        name: user.name,
        type: workout.type,
        minutes: workout.minutes
      }))
    );

    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.allWorkouts;

    if (this.searchQuery) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedWorkoutType) {
      filtered = filtered.filter(workout => workout.type === this.selectedWorkoutType);
    }

    this.displayedWorkouts = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

 changePage(direction: number) {
  const newPage = this.currentPage + direction;
  const maxPage = Math.ceil(this.allWorkouts.length / this.itemsPerPage);

  if (newPage < 1 || newPage > maxPage) {
    return; // Prevent out-of-bounds page change
  }

  this.currentPage = newPage;
  this.applyFilters();
}

}
