import { Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  imports: [IconComponent],
})
export class ConfirmDialogComponent {
  title        = input<string>('Are you sure?');
  message      = input<string>('This action cannot be undone.');
  confirmLabel = input<string>('Delete');
  confirmed    = output<void>();
  cancelled    = output<void>();
}
