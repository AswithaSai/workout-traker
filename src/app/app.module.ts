import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// Import standalone components
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

@NgModule({
  declarations: [
     // Only non-standalone components should be here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AddWorkoutComponent, // Standalone component added here
    WorkoutListComponent, // Standalone component added here
    WorkoutChartComponent // Standalone component added here
  ],
  providers: [],
  //bootstrap: [AppComponent]
  bootstrap:[]
})
export class AppModule { }
