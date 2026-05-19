import { Injectable, effect, signal } from '@angular/core';
import { BoardColumn } from '../models/board.model';
import { TaskCard } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class BoardService {
  readonly columns = signal<BoardColumn[]>([
    {
      id: 'open',
      title: 'Backlog',
      color: '#6366f1',
      cards: [
        {
          id: '1',
          title: 'Setup CI/CD Pipeline',
          description: 'Configure GitHub Actions for automated build, test, and deploy to staging and production environments.',
          category: 'DevOps',
          createdAt: Date.now() - 2 * 86400000,
          priority: 'high',
        },
        {
          id: '2',
          title: 'Write Unit Tests for Auth Module',
          description: 'Increase test coverage for authentication service to at least 80% using Jest.',
          category: 'Testing',
          createdAt: Date.now() - 3 * 86400000,
          priority: 'medium',
        },
        {
          id: '3',
          title: 'Refactor Legacy API Handler',
          description: 'Migrate old REST handler to use the new service layer pattern and remove duplicated logic.',
          category: 'Backend',
          createdAt: Date.now() - 5 * 86400000,
          priority: 'low',
        },
      ],
    },
    {
      id: 'todo',
      title: 'In Progress',
      color: '#f59e0b',
      cards: [
        {
          id: '4',
          title: 'Fix N+1 Query on Dashboard',
          description: 'Dashboard page is making excessive DB queries. Optimize with eager loading and add query caching.',
          category: 'Bug Fix',
          image: 'https://picsum.photos/seed/database/320/160',
          createdAt: Date.now() - 86400000,
          priority: 'high',
        },
        {
          id: '5',
          title: 'Implement JWT Refresh Token',
          description: 'Add refresh token rotation logic to prevent session expiry and improve security.',
          category: 'Backend',
          createdAt: Date.now() - 2 * 86400000,
          priority: 'high',
        },
      ],
    },
    {
      id: 'inwork',
      title: 'Done',
      color: '#10b981',
      cards: [
        {
          id: '6',
          title: 'Migrate Database to PostgreSQL',
          description: 'Successfully migrated from MySQL to PostgreSQL. Updated all queries and connection configs.',
          category: 'DevOps',
          createdAt: Date.now() - 7 * 86400000,
          priority: 'high',
        },
        {
          id: '7',
          title: 'Code Review: Payment Module',
          description: 'Reviewed and approved PR #142. Left comments on error handling and edge case coverage.',
          category: 'Review',
          createdAt: Date.now() - 3 * 86400000,
          priority: 'medium',
        },
        {
          id: '8',
          title: 'Update API Documentation',
          description: 'Updated Swagger docs for all v2 endpoints including request/response schemas.',
          category: 'Docs',
          createdAt: Date.now() - 4 * 86400000,
          priority: 'low',
        },
      ],
    },
  ]);

  private static readonly STORAGE_KEY = 'kanban-board-v2';

  constructor() {
    const stored = localStorage.getItem(BoardService.STORAGE_KEY);
    if (stored) {
      try {
        this.columns.set(JSON.parse(stored));
      } catch {}
    }
    effect(() => {
      localStorage.setItem(BoardService.STORAGE_KEY, JSON.stringify(this.columns()));
    });
  }

  moveCard(fromColId: string, toColId: string, fromIndex: number, toIndex: number): void {
    this.columns.update((cols) => {
      const newCols = cols.map((c) => ({ ...c, cards: [...c.cards] }));
      const from = newCols.find((c) => c.id === fromColId)!;
      const to = newCols.find((c) => c.id === toColId)!;
      const [card] = from.cards.splice(fromIndex, 1);
      to.cards.splice(toIndex, 0, card);
      return newCols;
    });
  }

  addCard(colId: string, card: Omit<TaskCard, 'id'>): void {
    const newCard: TaskCard = { ...card, id: Date.now().toString() };
    this.columns.update((cols) =>
      cols.map((c) => (c.id === colId ? { ...c, cards: [...c.cards, newCard] } : c)),
    );
  }

  deleteCard(colId: string, cardId: string): void {
    this.columns.update((cols) =>
      cols.map((c) =>
        c.id === colId ? { ...c, cards: c.cards.filter((card) => card.id !== cardId) } : c,
      ),
    );
  }

  addColumn(title: string, color: string): void {
    this.columns.update((cols) => [
      ...cols,
      { id: Date.now().toString(), title, color, cards: [] },
    ]);
  }

  deleteColumn(colId: string): void {
    this.columns.update((cols) => cols.filter((c) => c.id !== colId));
  }

  renameColumn(id: string, title: string): void {
    this.columns.update((cols) =>
      cols.map((c) => (c.id === id ? { ...c, title } : c)),
    );
  }

  moveColumn(fromIndex: number, toIndex: number): void {
    this.columns.update((cols) => {
      const result = [...cols];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }

  updateCard(colId: string, card: TaskCard): void {
    this.columns.update((cols) =>
      cols.map((c) =>
        c.id === colId
          ? { ...c, cards: c.cards.map((existing) => (existing.id === card.id ? { ...existing, ...card } : existing)) }
          : c,
      ),
    );
  }
}
