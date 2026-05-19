import { Component, ElementRef, HostListener, computed, input, output, signal, viewChild } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { BoardColumn } from '../../models/board.model';
import { TaskCard } from '../../models/task.model';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../icon/icon.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-column',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, CardComponent, ConfirmDialogComponent, IconComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  column = input.required<BoardColumn>();
  connectedCardListIds = input.required<string[]>();
  cardDropped = output<CdkDragDrop<string>>();
  addRequested = output<string>();
  cardDeleted = output<{ columnId: string; cardId: string }>();
  cardEditRequested = output<{ columnId: string; card: TaskCard }>();
  columnDeleted = output<string>();
  columnRenamed = output<{ id: string; title: string }>();

  showMenu = signal(false);
  showDeleteConfirm = signal(false);
  editingTitle = signal(false);
  editValue = signal('');

  readonly highPriorityCount = computed(() =>
    this.column().cards.filter((c) => c.priority === 'high').length,
  );

  private readonly titleInputEl = viewChild<ElementRef<HTMLInputElement>>('titleInputEl');

  @HostListener('document:click')
  closeMenu(): void {
    this.showMenu.set(false);
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showMenu.update((v) => !v);
  }

  deleteColumn(event: MouseEvent): void {
    event.stopPropagation();
    this.showMenu.set(false);
    this.showDeleteConfirm.set(true);
  }

  confirmDeleteColumn(): void {
    this.columnDeleted.emit(this.column().id);
    this.showDeleteConfirm.set(false);
  }

  startEdit(event: MouseEvent): void {
    event.stopPropagation();
    this.editValue.set(this.column().title);
    this.editingTitle.set(true);
    setTimeout(() => {
      const el = this.titleInputEl()?.nativeElement;
      el?.focus();
      el?.select();
    });
  }

  saveEdit(): void {
    const title = this.editValue().trim();
    if (title && title !== this.column().title) {
      this.columnRenamed.emit({ id: this.column().id, title });
    }
    this.editingTitle.set(false);
  }

  cancelEdit(): void {
    this.editingTitle.set(false);
  }

  onTitleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.saveEdit();
    if (event.key === 'Escape') this.cancelEdit();
  }

  onDrop(event: CdkDragDrop<string>): void {
    this.cardDropped.emit(event);
  }

  onCardDeleted(cardId: string): void {
    this.cardDeleted.emit({ columnId: this.column().id, cardId });
  }

  onCardEditRequested(card: TaskCard): void {
    this.cardEditRequested.emit({ columnId: this.column().id, card });
  }
}
