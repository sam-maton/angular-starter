import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { authClient } from '../../../lib/auth-client';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  showSignup = signal(false);
  signUpPassword = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
  });

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
    confirmPassword: new FormControl('', [
      Validators.minLength(8),
      Validators.pattern(this.signUpPassword()),
    ]),
  });

  async onLogin() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;
    const { data, error } = await authClient.signIn.email({ email, password });

    console.log(data, error);
    if (error) {
      // Handle error (e.g., show a notification)
      console.error('Login error:', error.message);
    } else {
      //redirect to dashboard
      console.log('Login successful:', data);
      
    }
  }

  async onSignup() {
    const { data, error } = await authClient.signUp.email({
      email: 'test@user.com',
      password: 'password123',
      name: 'Test User',
    });

    console.log({ data, error });
  }

  toggleSignup() {
    this.showSignup.update((value) => !value);
  }

  updateSignUpPassword(event: Event) {
    this.signUpPassword.set((event.target as HTMLInputElement).value);
  }
}
