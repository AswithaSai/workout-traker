import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here for standalone component

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent {
  workouts: any[] = [];
  selectedUser: any;

  ngOnInit(): void {
    this.workouts = [
      { name: 'User 1', workouts: [{ type: 'Running' }] },
      { name: 'User 2', workouts: [{ type: 'Cycling' }] },
      { name: 'User 3', workouts: [{ type: 'Yoga' }] },
    ];
  }

  updateChart(): void {
    console.log(this.selectedUser);
    // Logic to update the chart
  }
}
