import { Component, computed, inject, signal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { BoardService } from '../../services/board.service';
import { ColumnComponent } from '../column/column.component';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';
import { TaskCard } from '../../models/task.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-board',
  imports: [CdkDrag, CdkDropList, ColumnComponent, AddCardModalComponent, IconComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  private readonly boardService = inject(BoardService);

  readonly columns = this.boardService.columns;
  readonly cardListIds = computed(() => this.columns().map((c) => 'cards-' + c.id));
  readonly rejectAll = () => false;

  showModal = signal(false);
  targetColumnId = signal('');
  editingCard = signal<TaskCard | null>(null);
  editTargetColumnId = signal('');
  showAddColumnForm = signal(false);
  newColumnTitle = signal('');
  newColumnColor = signal('#6366f1');
  newColumnTitleError = signal(false);

  readonly colorOptions = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f97316', '#f59e0b', '#10b981', '#06b6d4',
    '#3b82f6', '#64748b',
  ];

  onDrop(event: CdkDragDrop<string>): void {
    this.boardService.moveCard(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  onColumnDrop(event: CdkDragDrop<any>): void {
    this.boardService.moveColumn(event.previousIndex, event.currentIndex);
  }

  openModal(columnId: string): void {
    this.targetColumnId.set(columnId);
    this.showModal.set(true);
  }

  onCardSaved(card: Omit<TaskCard, 'id'>): void {
    this.boardService.addCard(this.targetColumnId(), card);
    this.showModal.set(false);
  }

  onCardDeleted(event: { columnId: string; cardId: string }): void {
    this.boardService.deleteCard(event.columnId, event.cardId);
  }

  onCardEditRequested(event: { columnId: string; card: TaskCard }): void {
    this.editTargetColumnId.set(event.columnId);
    this.editingCard.set(event.card);
  }

  onCardUpdated(card: TaskCard): void {
    this.boardService.updateCard(this.editTargetColumnId(), card);
    this.editingCard.set(null);
  }

  onColumnDeleted(columnId: string): void {
    this.boardService.deleteColumn(columnId);
  }

  onColumnRenamed(event: { id: string; title: string }): void {
    this.boardService.renameColumn(event.id, event.title);
  }

  openAddColumnForm(): void {
    this.newColumnTitle.set('');
    this.newColumnColor.set('#6366f1');
    this.newColumnTitleError.set(false);
    this.showAddColumnForm.set(true);
  }

  confirmAddColumn(): void {
    const title = this.newColumnTitle().trim();
    if (!title) {
      this.newColumnTitleError.set(true);
      return;
    }
    this.boardService.addColumn(title, this.newColumnColor());
    this.showAddColumnForm.set(false);
  }

  updateColumnTitle(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.newColumnTitle.set(val);
    if (val.trim()) this.newColumnTitleError.set(false);
  }

  onColumnTitleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.confirmAddColumn();
    if (event.key === 'Escape') this.showAddColumnForm.set(false);
  }
}
