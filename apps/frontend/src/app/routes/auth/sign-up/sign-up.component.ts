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
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    IftaLabelModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  router = inject(Router);

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.minLength(8)]),
  });

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
}
