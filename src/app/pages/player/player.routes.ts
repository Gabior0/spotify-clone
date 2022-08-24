import { ListMusicsComponent } from './../list-musics/list-musics.component';
import { HomeComponent } from './../home/home.component';
import { PlayerComponent } from './player.component';
import { Routes } from '@angular/router';

export const playerRotes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'list/:type/:id',
        component: ListMusicsComponent,
      },
    ],
  },
];
