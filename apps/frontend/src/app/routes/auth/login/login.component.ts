import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { authClient } from '../../../../lib/auth-client';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    IftaLabelModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  loginForm = new FormGroup({
    email: new FormControl('test@user.com', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('password123', [Validators.minLength(8)]),
  });

  async onLogin() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      this.loginForm.setErrors({ incomplete: true });
      return;
    }

    try {
      await this.userService.login(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login error:', (error as Error).message);
      return;
    }
  }
}
