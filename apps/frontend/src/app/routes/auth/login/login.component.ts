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
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8)]),
  });

  async onLogin() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      this.loginForm.setErrors({ incomplete: true });
      return;
    }
    const { data, error } = await authClient.signIn.email({ email, password });
    console.log(data);
    if (error) {
      console.error('Login error:', error.message);
    } else {
      this.router.navigate(['/']);
    }
  }
}
