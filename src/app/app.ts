import { Component } from '@angular/core';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  template: '<app-board />',
  styles: [':host { display: block; height: 100vh; }']
})
export class App {}
