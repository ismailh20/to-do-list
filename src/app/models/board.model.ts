import { TaskCard } from './task.model';

export interface BoardColumn {
  id: string;
  title: string;
  color: string;
  cards: TaskCard[];
}
