import { Routes } from '@angular/router';
import { APP_ROUTES } from './models/constants';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
  { path: APP_ROUTES.GAME, component: GameComponent },
  { path: '', redirectTo: `/${APP_ROUTES.GAME}`, pathMatch: 'full' },
  { path: '**', redirectTo: `/${APP_ROUTES.GAME}` },
];
