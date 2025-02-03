import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutChartComponent, CommonModule, FormsModule, BaseChartDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load workouts from localStorage', () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [{ type: 'Running', minutes: 30 }]
      }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUsers));

    component.loadWorkouts();

    expect(component.users).toEqual(mockUsers);
  });

  it('should generate chart data based on selected user', () => {
    component.users = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      }
    ];
    component.selectedUser = 'John Doe';
    component.generateCharts();

    expect(component.barChartData.labels).toEqual(['Running', 'Cycling']);
    expect(component.barChartData.datasets[0].data).toEqual([30, 45]);

    expect(component.pieChartData.labels).toEqual(['Running', 'Cycling']);
    expect(component.pieChartData.datasets[0].data).toEqual([30, 45]);
  });

  it('should update selected user and regenerate charts', () => {
    spyOn(component, 'generateCharts');

    component.selectUser('Jane Doe');

    expect(component.selectedUser).toBe('Jane Doe');
    expect(component.generateCharts).toHaveBeenCalled();
  });

  it('should toggle between bar and pie chart types', () => {
    expect(component.chartType).toBe('bar');

    component.toggleChartType();
    expect(component.chartType).toBe('pie');

    component.toggleChartType();
    expect(component.chartType).toBe('bar');
  });


  it('should initialize barChartData and pieChartData in ngOnInit', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    }
  ];
  spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUsers));

  component.ngOnInit();

  expect(component.barChartData.labels).toEqual(['Running', 'Cycling']);
  expect(component.barChartData.datasets[0].data).toEqual([30, 45]);
  expect(component.pieChartData.labels).toEqual(['Running', 'Cycling']);
  expect(component.pieChartData.datasets[0].data).toEqual([30, 45]);
});

it('should toggle chart type between bar and pie', () => {
  expect(component.chartType).toBe('bar');

  component.toggleChartType();
  expect(component.chartType).toBe('pie');

  component.toggleChartType();
  expect(component.chartType).toBe('bar');
});

it('should handle empty workouts array for a selected user', () => {
  component.users = [
    { id: 1, name: 'John Doe', workouts: [] } // Empty workouts
  ];
  component.selectedUser = 'John Doe';
  component.generateCharts();

  expect(component.barChartData.labels).toEqual([]);
  expect(component.barChartData.datasets[0].data).toEqual([]);
  expect(component.pieChartData.labels).toEqual([]);
  expect(component.pieChartData.datasets[0].data).toEqual([]);
});

it('should not fail when selectedUser is not found', () => {
  component.users = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] }
  ];
  component.selectedUser = 'Non-Existent User';
  component.generateCharts();

  expect(component.barChartData.labels).toEqual([]);
  expect(component.barChartData.datasets[0].data).toEqual([]);
  expect(component.pieChartData.labels).toEqual([]);
  expect(component.pieChartData.datasets[0].data).toEqual([]);
});
});
