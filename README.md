



# My To Do List

A Kanban-style task board built with **Angular 20** — drag-and-drop cards and columns, inline editing, persistent storage, and a clean modern UI.

---

## Demo

<!-- Paste your video demo below (YouTube embed, GIF, or MP4 link) -->

> ?? **Video demo coming soon**
>
> _Replace this block with your video. Example for YouTube:_
> ```
> [![Demo][(https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)](https://github.com/user-attachments/assets/12cd3f17-855f-4194-aeaa-9c682e136c16)
> ```
> _Or drag & drop a GIF/screenshot directly into this README on GitHub._

---

## Features

- **Kanban board** — multiple columns, each with cards organized by status
- **Drag & drop** — reorder cards within and between columns; reorder columns by dragging the header
- **Add card** — modal form with title, description, category, priority, and optional cover image
- **Edit card** — click the pencil icon on any card to edit its details
- **Delete card / column** — confirmation popup before any destructive action
- **Inline column title editing** — click a column title to rename it
- **Add / delete columns** — with a custom color picker
- **Priority indicator** — color-coded left border per card (red = high, amber = medium, green = low)
- **Description expand/collapse** — truncated to 2 lines, click to expand
- **Dynamic timestamps** — "Just now", "2h ago", "3 days ago", etc., computed from creation time
- **Persistent storage** — board state saved to `localStorage`, survives page refresh
- **Empty state** — helpful prompt when all columns are removed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 (standalone, zoneless) |
| State | Angular Signals (`signal`, `computed`) |
| Drag & Drop | `@angular/cdk/drag-drop` |
| Styling | SCSS (component-scoped) |
| Storage | `localStorage` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run

```bash
# Install dependencies
npm install

# Start dev server
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build

```bash
npm run build
```

Output is placed in `dist/`.

---

## Project Structure

```
src/
+-- app/
    +-- components/
    ¦   +-- board/          # Main board layout & column orchestration
    ¦   +-- column/         # Single Kanban column
    ¦   +-- card/           # Single task card
    ¦   +-- add-card-modal/ # Add / edit card modal
    ¦   +-- confirm-dialog/ # Reusable delete confirmation popup
    +-- models/
    ¦   +-- task.model.ts   # TaskCard, Priority types
    ¦   +-- board.model.ts  # BoardColumn type
    +-- services/
        +-- board.service.ts  # Signal-based state + localStorage persistence
```

---

## License

MIT
