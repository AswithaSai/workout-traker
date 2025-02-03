import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

Chart.register(...registerables); 

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit {
  users: User[] = [];
  selectedUser: string = 'John Doe'; 
  chartType: ChartType = 'bar'; 

  barChartData!: ChartData<'bar'>;
  pieChartData!: ChartData<'pie'>; 
  chartOptions = { responsive: true };

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.generateCharts();
  }

  selectUser(userName: string) {
    this.selectedUser = userName;
    this.generateCharts();
  }

  toggleChartType() {
    this.chartType = this.chartType === 'bar' ? 'pie' : 'bar';
  }

  generateCharts() {
    const selectedUser = this.users.find(user => user.name === this.selectedUser);
    const workouts = selectedUser ? selectedUser.workouts : [];

    const workoutTypes = workouts.map(workout => workout.type);
    const minutesPerType = workouts.map(workout => workout.minutes);

    this.barChartData = {
      labels: workoutTypes,
      datasets: [
        {
          label: 'Minutes',
          data: minutesPerType,
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']
        }
      ]
    };

    this.pieChartData = {
      labels: workoutTypes,
      datasets: [
        {
          data: minutesPerType,
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']
        }
      ]
    };
  }
}
