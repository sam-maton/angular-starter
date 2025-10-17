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
    password: new FormControl(''),
  });

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
    confirmPassword: new FormControl('', [
      Validators.minLength(8),
      Validators.pattern(this.signUpPassword()),
    ]),
  });

  onSubmit() {
    console.log(this.loginForm);
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
