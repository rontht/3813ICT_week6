import { Routes } from '@angular/router';
import { Messenger } from './messenger/messenger';

export const routes: Routes = [
  {
    path: '',
    component: Messenger,
    title: 'Messenger',
  },
];
