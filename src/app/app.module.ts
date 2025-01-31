import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// Import components
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';

@NgModule({
  declarations: [
    
  ],
  imports: [BrowserModule,
    FormsModule,
    NavbarComponent,
    AddWorkoutComponent, // Standalone component added here
    WorkoutListComponent, // Standalone component added here
    WorkoutChartComponent 
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
