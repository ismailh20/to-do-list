import { Component, input, output, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TaskCard } from '../../models/task.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { IconComponent } from '../icon/icon.component';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Frontend:    { bg: '#dbeafe', text: '#1d4ed8' },
  Backend:     { bg: '#ede9fe', text: '#6d28d9' },
  DevOps:      { bg: '#d1fae5', text: '#065f46' },
  'Bug Fix':   { bg: '#fee2e2', text: '#b91c1c' },
  Testing:     { bg: '#fef9c3', text: '#92400e' },
  Review:      { bg: '#e0f2fe', text: '#0369a1' },
  Docs:        { bg: '#f1f5f9', text: '#475569' },
  Security:    { bg: '#fce7f3', text: '#be185d' },
  Performance: { bg: '#ffedd5', text: '#c2410c' },
  Other:       { bg: '#f1f5f9', text: '#64748b' },
};

@Component({
  selector: 'app-card',
  imports: [NgStyle, ConfirmDialogComponent, IconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  card = input.required<TaskCard>();
  deleted = output<string>();
  editRequested = output<TaskCard>();
  descExpanded = signal(false);
  showDeleteConfirm = signal(false);

  toggleDesc(): void {
    this.descExpanded.update((v) => !v);
  }

  onEdit(event: MouseEvent): void {
    event.stopPropagation();
    this.editRequested.emit(this.card());
  }

  timeAgoText(): string {
    const diff = Date.now() - this.card().createdAt;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks === 1) return '1 week ago';
    return `${weeks} weeks ago`;
  }

  getCategoryStyle(category: string): { background: string; color: string } {
    const style = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['Other'];
    return { background: style.bg, color: style.text };
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showDeleteConfirm.set(true);
  }

  confirmDelete(): void {
    this.deleted.emit(this.card().id);
    this.showDeleteConfirm.set(false);
  }
}
