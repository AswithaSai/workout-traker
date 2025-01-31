import { Component, EventEmitter, Output ,Input} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() toggleButtonText: string = 'View Charts';
  @Output() toggleCharts = new EventEmitter<void>();
  @Output() openModal = new EventEmitter<void>();

  onToggleCharts() {
    console.log('View Charts Clicked'); // ✅ Log Click Event
    this.toggleCharts.emit();
  }

  onOpenModal() {
    console.log('Add Workout Clicked'); // ✅ Log Click Event
    this.openModal.emit();
  }
}
