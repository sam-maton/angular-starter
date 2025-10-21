import { Route } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { SignUpComponent } from './routes/auth/sign-up/sign-up.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
];
