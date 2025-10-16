import { Route } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
];
