import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { authClient } from '../../../lib/auth-client';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    IftaLabelModule,
    PasswordModule,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  router = inject(Router);
  showSignup = signal(false);
  signUpPassword = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8)]),
  });

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
    confirmPassword: new FormControl('', [
      Validators.minLength(8),
      Validators.pattern(this.signUpPassword()),
    ]),
  });

  async onLogin() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      this.loginForm.setErrors({ incomplete: true });
      return;
    }
    const { data, error } = await authClient.signIn.email({ email, password });

    if (error) {
      console.error('Login error:', error.message);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSignup() {
    const { username, email, password } = this.signupForm.value;

    if (!username || !email || !password) return;

    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: username,
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
