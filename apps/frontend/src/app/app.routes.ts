import { Route } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DashboardRootComponent } from './routes/dashboard/dashboard-root/dashboard-root.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardRootComponent,
      },
    ],
  },
];
