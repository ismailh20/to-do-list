export type Priority = 'low' | 'medium' | 'high';

export interface TaskCard {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  createdAt: number;
  priority: Priority;
}
