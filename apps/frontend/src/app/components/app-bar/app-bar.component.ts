import { Component, OnInit, inject } from '@angular/core';
import { authClient } from '../../../lib/auth-client';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bar',
  imports: [MenubarModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent implements OnInit {
  userService = inject(UserService);

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: this.onSignOut,
          },
        ],
      },
    ];
  }

  async onSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          window.location.href = '/login';
        },
      },
    });
  }
}
