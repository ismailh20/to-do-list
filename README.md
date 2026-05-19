# My To Do List

A Kanban-style task board built with **Angular 20** — drag-and-drop cards and columns, inline editing, persistent storage, and a clean modern UI.

---

## Demo

![Demo](https://github.com/user-attachments/assets/12cd3f17-855f-4194-aeaa-9c682e136c16)

---

## Features

- **Kanban board** — multiple columns, each with cards organized by status
- **Drag & drop** — reorder cards within and between columns; reorder columns by dragging the header
- **Add card** — modal form with title, description, category, priority, and optional cover image
- **Edit card** — click the pencil icon on any card to edit its details
- **Delete card / column** — confirmation popup before any destructive action
- **Inline column title editing** — click a column title to rename it
- **Add / delete columns** — with a custom color picker
- **Priority indicator** — color-coded left border per card
  - Red = High
  - Amber = Medium
  - Green = Low
- **Description expand/collapse** — truncated to 2 lines, click to expand
- **Dynamic timestamps** — "Just now", "2h ago", "3 days ago", etc.
- **Persistent storage** — board state saved to `localStorage`, survives page refresh
- **Empty state** — helpful prompt when all columns are removed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 (standalone, zoneless) |
| State Management | Angular Signals (`signal`, `computed`) |
| Drag & Drop | `@angular/cdk/drag-drop` |
| Styling | SCSS (component-scoped) |
| Storage | `localStorage` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm start
```

Open:

```text
http://localhost:4200
```

---

## Build for Production

```bash
npm run build
```

The production build output will be generated inside:

```text
dist/
```

---

## Project Structure

```text
src/
└── app/
    ├── components/
    │   ├── board/              # Main board layout & orchestration
    │   ├── column/             # Single Kanban column
    │   ├── card/               # Task card component
    │   ├── add-card-modal/     # Add/edit task modal
    │   └── confirm-dialog/     # Reusable confirmation popup
    │
    ├── models/
    │   ├── task.model.ts       # Task & priority types
    │   └── board.model.ts      # Board column model
    │
    └── services/
        └── board.service.ts    # Signal-based state & localStorage persistence
```

---

## Key Concepts

### Angular Signals

This project uses Angular Signals for reactive state management:

- `signal`
- `computed`
- `effect`

Benefits:
- Fine-grained reactivity
- Better performance
- Cleaner state updates
- Reduced unnecessary re-renders

---

## Future Improvements

- Dark mode
- Backend integration
- Authentication
- Real-time collaboration
- Task labels & filtering
- Due dates & reminders

---

## License

MIT
