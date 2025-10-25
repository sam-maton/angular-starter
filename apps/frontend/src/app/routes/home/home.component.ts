import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterModule, AppBarComponent],
})
export class HomeComponent {}
