import { Component, OnInit, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCard, Priority } from '../../models/task.model';
import { IconComponent } from '../icon/icon.component';

const CATEGORIES = [
  'Frontend',
  'Backend',
  'DevOps',
  'Bug Fix',
  'Testing',
  'Review',
  'Docs',
  'Security',
  'Performance',
  'Other',
];

@Component({
  selector: 'app-add-card-modal',
  imports: [FormsModule, IconComponent],
  templateUrl: './add-card-modal.component.html',
  styleUrl: './add-card-modal.component.scss',
})
export class AddCardModalComponent implements OnInit {
  columnId = input.required<string>();
  editCard = input<TaskCard | null>(null);
  saved = output<Omit<TaskCard, 'id'>>();
  updated = output<TaskCard>();
  cancelled = output<void>();

  readonly categories = CATEGORIES;

  form = signal({
    title: '',
    description: '',
    category: 'Frontend',
    priority: 'medium' as Priority,
    image: '',
  });

  titleError = signal(false);
  descError = signal(false);

  ngOnInit(): void {
    const card = this.editCard();
    if (card) {
      this.form.set({
        title: card.title,
        description: card.description ?? '',
        category: card.category,
        priority: card.priority,
        image: card.image ?? '',
      });
    }
  }

  updateField(field: string, event: Event): void {
    const val = (event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
    this.form.update((f) => ({ ...f, [field]: val }));
    if (field === 'title' && val.trim()) this.titleError.set(false);
    if (field === 'description' && val.trim()) this.descError.set(false);
  }

  onSave(): void {
    const f = this.form();
    const titleOk = !!f.title.trim();
    const descOk = !!f.description.trim();
    this.titleError.set(!titleOk);
    this.descError.set(!descOk);
    if (!titleOk || !descOk) return;
    const existing = this.editCard();
    if (existing) {
      this.updated.emit({
        ...existing,
        title: f.title.trim(),
        description: f.description.trim(),
        category: f.category,
        priority: f.priority,
        image: f.image.trim() || undefined,
      });
    } else {
      this.saved.emit({
        title: f.title.trim(),
        description: f.description.trim(),
        category: f.category,
        priority: f.priority,
        image: f.image.trim() || undefined,
        createdAt: Date.now(),
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
